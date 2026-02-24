import { apiFetch } from "../api/http";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, total, addToCart, decreaseQty, removeFromCart, clearCart } = useCart();

  const checkout = async () => {
    if (!items.length) return;

    const payload = {
      items: items.map((x) => ({
        product_id: x.product.id,
        quantity: x.quantity,
      })),
    };

    try {
      const r = await apiFetch("/checkout", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      alert(`Compra completada ✅\nTotal: Q${Number(r.total).toFixed(2)}\nVenta #${r.saleId}`);
      clearCart();
    } catch (e) {
      alert(`Error en compra: ${e.message}`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Carrito</h1>
          <p className="text-slate-500 text-sm">Administra cantidades y confirma tu compra.</p>
        </div>

        <button
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          onClick={clearCart}
          disabled={!items.length}
        >
          Vaciar
        </button>
      </div>

      {!items.length ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">Tu carrito está vacío.</div>
      ) : (
        <div className="space-y-3">
          {items.map((x) => (
            <div
              key={x.product.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 truncate">{x.product.name}</div>
                  <div className="text-slate-500 text-sm">Q{Number(x.product.price).toFixed(2)} c/u</div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5" onClick={() => decreaseQty(x.product.id)}>-</button>
                  <div className="w-10 text-center font-semibold text-slate-700">{x.quantity}</div>
                  <button className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5" onClick={() => addToCart(x.product)}>+</button>
                </div>

                <div className="text-sm text-slate-600">
                  Subtotal: <span className="font-semibold text-slate-800">Q{(Number(x.product.price) * x.quantity).toFixed(2)}</span>
                </div>

                <button className="rounded-xl bg-rose-500 px-3 py-2 text-sm text-white transition hover:bg-rose-600" onClick={() => removeFromCart(x.product.id)}>
                  Quitar
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <div className="text-xl font-bold text-slate-800">Total: Q{total.toFixed(2)}</div>
            <button className="rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700" onClick={checkout}>
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
