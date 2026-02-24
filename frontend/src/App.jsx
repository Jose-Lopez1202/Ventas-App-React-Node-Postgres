import { useEffect, useState } from "react";
import Navbar from "./componentes/Navbar";
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
  const [view, setView] = useState("products");

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
      <div className="min-h-screen bg-[#f1f5f9] text-slate-700">
        {user && <Navbar user={user} view={view} onNav={setView} onLogout={logout} />}

        <main className="min-h-[calc(100vh-73px)] w-full px-4 py-6 sm:py-10">
          <div className="mx-auto w-full max-w-6xl">
            {!user ? (
              <Login onLogin={(u) => setUser(u)} />
            ) : view === "products" ? (
              <Products />
            ) : view === "cart" ? (
              <Carrito />
            ) : (
              <Admin />
            )}
          </div>
        </main>
      </div>
    </CartProvider>
  );
}
