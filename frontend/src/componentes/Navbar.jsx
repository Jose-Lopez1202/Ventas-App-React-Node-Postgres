import { useState } from "react";

export default function Navbar({ user, onLogout, onNav, view }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Mobile button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
            >
              <span className="sr-only">Open main menu</span>

              {/* Icon hamburger */}
              {!open ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>

          {/* Left: logo + links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center gap-3">
              {/* tu logo local */}
              <img src="/Imagenes/logoVentas.png" alt="Ventas App" className="h-8 w-auto" />
             {/* <span className="text-white font-semibold hidden sm:block">App de ventas</span>*/}
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <button
                  onClick={() => onNav("products")}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    view === "products"
                    /*EN ESTA PARTE SE COLOCA HOVERS, COLOR DE FONDO DEL TEXTO, ETC*/
                        ? "bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  Productos
                </button>

                <button
                  onClick={() => onNav("cart")}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    view === "cart"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  Carrito
                </button>

                {user?.role === "admin" && (
                  <button
                    onClick={() => onNav("admin")}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      view === "admin"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    Admin
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right user */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
            {user ? (
              <>
                <span className="text-gray-300 text-sm hidden sm:block">
                  {user.name} ({user.role})
                </span>

                <button
                  onClick={onLogout}
                  className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500"
                >
                  Salir
                </button>
              </>
            ) : (
              <span className="text-gray-300 text-sm">No logueado</span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="block sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <button
              onClick={() => { onNav("products"); setOpen(false); }}
              className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                view === "products"
                  ? "bg-gray-950/50 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Productos
            </button>

            <button
              onClick={() => { onNav("cart"); setOpen(false); }}
              className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                view === "cart"
                  ? "bg-gray-950/50 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Carrito
            </button>

            {user?.role === "admin" && (
              <button
                onClick={() => { onNav("admin"); setOpen(false); }}
                className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                  view === "admin"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Admin
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
