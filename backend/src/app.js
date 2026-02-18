const express = require("express");
const cors = require("cors");
require("dotenv").config();


const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const admin = require("./middleware/admins");


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("OK");
});


app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, hash, role || "seller"]
    );

    res.status(201).json({ ok: true, user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const r = await pool.query(
      `SELECT id, name, email, password, role FROM users WHERE email = $1`,
      [email]
    );

    if (r.rows.length === 0) {
      return res.status(401).json({ ok: false, error: "Credenciales inválidas" });
    }

    const user = r.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ ok: false, error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      ok: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, price, stock, created_at FROM products ORDER BY id DESC"
    );
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/admin/users", auth, admin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1,$2,$3,$4)
       RETURNING id, name, email, role, created_at`,
      [name, email, hash, role || "seller"]
    );

    res.status(201).json({ ok: true, user: result.rows[0] });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/checkout", auth, async (req, res) => {
  const client = await pool.connect();
  try {
    const { items } = req.body; // [{product_id, quantity}]
    if (!items || !items.length) {
      return res.status(400).json({ ok: false, error: "Carrito vacío" });
    }

    await client.query("BEGIN");

    // 1) crear venta con total 0 (luego lo calculamos)
    const saleRes = await client.query(
      `INSERT INTO sales (user_id, total) VALUES ($1, 0) RETURNING id`,
      [req.user.id]
    );
    const saleId = saleRes.rows[0].id;

    let total = 0;

    // 2) por cada item: obtener precio actual, insertar detalle
    for (const it of items) {
      const pr = await client.query(
        `SELECT price FROM products WHERE id = $1`,
        [it.product_id]
      );
      if (pr.rows.length === 0) throw new Error("Producto no existe");

      const unitPrice = Number(pr.rows[0].price);
      const qty = Number(it.quantity);

      await client.query(
        `INSERT INTO sale_items (sale_id, product_id, quantity, unit_price)
         VALUES ($1,$2,$3,$4)`,
        [saleId, it.product_id, qty, unitPrice]
      );

      total += unitPrice * qty;
    }

    // 3) actualizar total
    await client.query(`UPDATE sales SET total = $1 WHERE id = $2`, [total, saleId]);

    await client.query("COMMIT");
    res.json({ ok: true, message: "Compra completada", saleId, total });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(500).json({ ok: false, error: e.message });
  } finally {
    client.release();
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor en ${PORT}`);
});
