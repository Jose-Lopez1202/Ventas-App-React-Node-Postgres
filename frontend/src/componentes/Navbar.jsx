import { useState } from "react";

export default function Navbar({ user, onLogout, onNav, view }) {
  const [open, setOpen] = useState(false);

  const tabClass = (key) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      view === key
        ? "bg-indigo-600 text-white shadow"
        : "text-slate-600 hover:bg-white hover:text-slate-900"
    }`;

  return (
    /*Aqui le pongo estilo a la navbar*/ 
    <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f8fafc]/90 backdrop-blur">  
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Aqui le coloco ubicación a Usuario y a botón salir*/}
        <div className="relative flex h-16 items-center justify-between"> {/* Aqui le doy disposición a menu*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">  {/* Aqui creo para que se ponga menu de hamburguesa*/}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-white hover:text-slate-900"
            >
              <span className="sr-only">Abrir menú</span>
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

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"> {/* Posición de titulo Ventas App*/}
            <div className="flex shrink-0 items-center gap-3">  {/* Centrado de titulo Ventas App*/}
              <span className="hidden text-sm font-semibold text-slate-700 sm:block">Ventas App</span> {/* estilo de titulo Ventas App*/}
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-3">
                <button onClick={() => onNav("products")} className={tabClass("products")}>Productos</button>
                <button onClick={() => onNav("cart")} className={tabClass("cart")}>Carrito</button>
                {user?.role === "admin" && (
                  <button onClick={() => onNav("admin")} className={tabClass("admin")}>Admin</button>
                )}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:ml-6 sm:pr-0">
            <span className="hidden text-sm text-slate-500 sm:block">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={onLogout}
              className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-[#f8fafc] sm:hidden">
          <div className="space-y-1 px-3 py-3">
            <button onClick={() => { onNav("products"); setOpen(false); }} className={`${tabClass("products")} w-full text-left`}>Productos</button>
            <button onClick={() => { onNav("cart"); setOpen(false); }} className={`${tabClass("cart")} w-full text-left`}>Carrito</button>
            {user?.role === "admin" && (
              <button onClick={() => { onNav("admin"); setOpen(false); }} className={`${tabClass("admin")} w-full text-left`}>Admin</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
