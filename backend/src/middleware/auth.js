const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ ok: false, error: "Token requerido" });

  const token = auth.split(" ")[1];
  try {
    //PARTE OBLIGATORIA PARA QUE UNICAMENTE USUARIOS CON ROL DE ADMINISTRADOR PUEDAN CREAR USUARIOS 
    req.user = jwt.verify(token, process.env.JWT_SECRET); 
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Token inválido" });
  }
};
