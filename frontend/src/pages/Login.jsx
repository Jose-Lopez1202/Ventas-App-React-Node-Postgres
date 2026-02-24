import { useState } from "react";
import { apiFetch } from "../api/http";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
      <h1 className="text-center text-2xl font-bold text-slate-800">Iniciar sesión</h1>
      <img src="/Imagenes/cuenta.png" alt="login" className="mx-auto mt-4 h-28 w-28" />

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-black">Email</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-black">Password</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="w-full rounded-xl bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-700">
          Entrar
        </button>

        {error && <div className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl p-3">{error}</div>}
      </form>
    </div>
  );
}
