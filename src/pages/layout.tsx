import { Outlet } from "react-router"

export const Layout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-rose-500 via-pink-500 to-fuchsia-700 text-rose-50 flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-rose-100/30 bg-rose-950/30 shadow-2xl shadow-rose-900/40 backdrop-blur-xl">
        <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-rose-400/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/40 blur-3xl" />
        <Outlet />
      </div>
    </div>
  )
}