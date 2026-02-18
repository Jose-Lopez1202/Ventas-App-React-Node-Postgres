import { useState } from "react";
import { apiFetch } from "../api/http";

export default function AdminCreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "seller",
  });

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      await apiFetch("/admin/users", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setMsg("Usuario creado ✅");
      setForm({ name: "", email: "", password: "", role: "seller" });
    } catch (e2) {
      setErr(e2.message);
    }
  };

  return (
    <div className="max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-1">Admin · Crear usuario</h2>
      <p className="text-slate-400 mb-6 text-sm">
        Solo visible si tu usuario es rol admin.
      </p>

      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-sm text-slate-300">Nombre</label>
          <input
            className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="Jose"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="jose@test.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="123456"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Rol</label>
          <select
            className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="seller">seller</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2 font-medium">
          Crear usuario
        </button>

        {msg && (
          <div className="text-emerald-400 text-sm bg-emerald-950/30 border border-emerald-900 rounded-xl p-3">
            {msg}
          </div>
        )}

        {err && (
          <div className="text-rose-400 text-sm bg-rose-950/30 border border-rose-900 rounded-xl p-3">
            {err}
          </div>
        )}
      </form>
    </div>
  );
}
