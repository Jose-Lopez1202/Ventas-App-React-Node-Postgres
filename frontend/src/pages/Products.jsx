import { useEffect, useState } from "react";
import { apiFetch } from "../api/http";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { addToCart, count } = useCart();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/products");
        setRows(data.data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Productos</h1>
          <p className="text-slate-400 text-sm">
            Agrega productos al carrito y compra (alerta).
          </p>
        </div>

        <div className="text-sm text-slate-300 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
          En carrito: <span className="font-semibold">{count}</span>
        </div>
      </div>

      {loading && (
        <div className="text-slate-400">Cargando productos...</div>
      )}

      {error && (
        <div className="text-rose-400 text-sm bg-rose-950/30 border border-rose-900 rounded-xl p-3">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-slate-400 text-sm">
                    Stock: {p.stock}
                  </div>
                </div>
                <div className="font-semibold">
                  Q{Number(p.price).toFixed(2)}
                </div>
              </div>

              <button
                className="mt-4 w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2"
                onClick={() => addToCart(p)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
