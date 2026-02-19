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
  <div className="min-h-screen bg-slate-950 text-slate-100">
 {user && (
  <Navbar
    user={user}
    view={view}
    onNav={setView}
    onLogout={logout}
  />
)}
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
