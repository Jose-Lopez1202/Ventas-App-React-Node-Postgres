import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Products from "./pages/Products";
import Carrito from "./pages/carrito";
import Admin from "./pages/Admin";

import { CartProvider } from "./context/CartContext";

function getSavedUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export default function App() {
  const [user, setUser] = useState(getSavedUser());
  const [view, setView] = useState("products"); // products | cart | admin

  useEffect(() => {
    if (!user) setView("products");
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <div className="font-semibold">Ventas App</div>

            <nav className="flex items-center gap-2">
              <button
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                onClick={() => setView("products")}
              >
                Productos
              </button>

              <button
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                onClick={() => setView("cart")}
              >
                Carrito
              </button>

              {user?.role === "admin" && (
                <button
                  className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500"
                  onClick={() => setView("admin")}
                >
                  Admin
                </button>
              )}

              {!user ? (
                <span className="ml-2 text-slate-300">No logueado</span>
              ) : (
                <div className="ml-2 flex items-center gap-2">
                  <span className="text-slate-300">
                    {user.name} ({user.role})
                  </span>
                  <button
                    className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500"
                    onClick={logout}
                  >
                    Salir
                  </button>
                </div>
              )}
            </nav>
          </div>
        </header>
<main className="min-h-[calc(100vh-73px)] w-full flex items-center justify-center px-4">
  <div className="w-full flex justify-center">
    {!user ? (
      <Login onLogin={(u) => setUser(u)} />
    ) : view === "products" ? (
      <div className="w-full max-w-5xl">
        <Products />
      </div>
    ) : view === "cart" ? (
      <div className="w-full max-w-5xl">
        <Carrito />
      </div>
    ) : (
      <div className="w-full max-w-5xl">
        <Admin />
      </div>
    )}
  </div>
</main>


      </div>
    </CartProvider>
  );
}
