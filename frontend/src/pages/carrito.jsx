import { apiFetch } from "../api/http";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, total, addToCart, decreaseQty, removeFromCart, clearCart } =
    useCart();

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

      alert(
        `Compra completada ✅\nTotal: Q${Number(r.total).toFixed(
          2
        )}\nVenta #${r.saleId}`
      );
      clearCart();
    } catch (e) {
      alert(`Error en compra: ${e.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Carrito</h1>
          <p className="text-slate-400 text-sm">
            Puedes aumentar, disminuir, quitar y comprar.
          </p>
        </div>

        <button
          className="rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2 text-sm"
          onClick={clearCart}
          disabled={!items.length}
        >
          Vaciar
        </button>
      </div>

      {!items.length ? (
        <div className="text-slate-400">Tu carrito está vacío.</div>
      ) : (
        <div className="space-y-3">
          {items.map((x) => (
            <div
              key={x.product.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="font-semibold truncate">{x.product.name}</div>
                <div className="text-slate-400 text-sm">
                  Q{Number(x.product.price).toFixed(2)} c/u
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2"
                  onClick={() => decreaseQty(x.product.id)}
                >
                  -
                </button>
                <div className="w-10 text-center font-semibold">
                  {x.quantity}
                </div>
                <button
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2"
                  onClick={() => addToCart(x.product)}
                >
                  +
                </button>
              </div>

              <div className="text-sm text-slate-300">
                Subtotal:{" "}
                <span className="font-semibold">
                  Q{(Number(x.product.price) * x.quantity).toFixed(2)}
                </span>
              </div>

              <button
                className="rounded-xl bg-rose-600 hover:bg-rose-500 px-3 py-2 text-sm"
                onClick={() => removeFromCart(x.product.id)}
              >
                Quitar
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <div className="text-lg font-semibold">
              Total: Q{total.toFixed(2)}
            </div>
            <button
              className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 font-medium"
              onClick={checkout}
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
