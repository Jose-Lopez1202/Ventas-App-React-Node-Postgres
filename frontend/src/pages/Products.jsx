import { useEffect, useState } from "react";
import { apiFetch } from "../api/http";
import { useCart } from "../context/CartContext";

const productImages = {
  "Camara Web": "https://images.unsplash.com/photo-1623949556303-b0d17d198863?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Laptop: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  Microfono: "https://images.unsplash.com/photo-1588800347304-ec7e6f353327?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Audifonos: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  Teclado: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
  Mouse: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
};

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
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Productos</h1>
        </div>

        <div className="text-sm text-slate-700 bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2">
          En carrito: <span className="font-semibold text-indigo-600">{count}</span>
        </div>
      </div>

      {loading && <div className="text-slate-500">Cargando productos...</div>}

      {error && <div className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl p-3">{error}</div>}

      {!loading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 bg-slate-100">
                <img src={productImages[p.name] || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"} alt={p.name} className="h-full w-full object-cover" />
              </div>

              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-800">{p.name}</div>
                    <div className="text-slate-500 text-sm">Stock: {p.stock}</div>
                  </div>
                  <div className="text-lg font-bold text-indigo-600">Q{Number(p.price).toFixed(2)}</div>
                </div>

                <button
                  className="mt-2 w-full rounded-xl bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-700"
                  onClick={() => addToCart(p)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
