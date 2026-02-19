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

      // data: { ok, token, user }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
<div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <center><h1 className="text-2xl font-semibold" >Iniciar sesión</h1></center>
        <img src="Imagenes/cuenta.png" alt="login" className="w-40 h-40 mx-auto mb-6"></img>
   {/* <p className="text-slate-400 mt-1">
          Ingresa tus credenciales para continuar.
        </p>*/}

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
    
          </div>
            <br></br>
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2 font-medium"
          >
            Entrar
          </button>

          {error && (
            <div className="text-rose-400 text-sm bg-rose-950/30 border border-rose-900 rounded-xl p-3">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
