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

      setMsg("Usuario creado");
      setForm({ name: "", email: "", password: "", role: "seller" });
    } catch (e2) {
      setErr(e2.message);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Admin · Crear usuario</h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600 block">Nombre</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:bg-white"
            placeholder="Jose"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 block">Email</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:bg-white"
            placeholder="jose@test.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 block">Password</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:bg-white"
            placeholder="123456"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 block">Rol</label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:bg-white"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="seller">seller</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button className="w-full rounded-xl bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-700">
          Crear usuario
        </button>

        {msg && <div className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 rounded-xl p-3">{msg}</div>}
        {err && <div className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl p-3">{err}</div>}
      </form>
    </div>
  );
}
