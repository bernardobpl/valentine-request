import { useEffect, useState } from "react"
import { Outlet } from "react-router"

const MOBILE_BREAKPOINT = 768

export const Layout = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  if (isMobile === null) {
    return (
      <div className="min-h-screen bg-linear-to-br from-rose-500 via-pink-500 to-fuchsia-700 flex items-center justify-center px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-200 border-t-rose-50" />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-rose-500 via-pink-500 to-fuchsia-700 text-rose-50 flex flex-col items-center justify-center px-6 py-8 text-center">
        <div className="mx-auto max-w-sm rounded-2xl border border-rose-100/30 bg-rose-950/40 p-6 shadow-xl backdrop-blur-xl">
          <p className="text-4xl mb-4" aria-hidden>💻</p>
          <h1 className="text-xl font-semibold text-rose-50">
            Use a computer to open this app
          </h1>
          <p className="mt-3 text-sm text-rose-100/90">
            This experience is designed for desktop. Please open it on a computer to continue.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-500 via-pink-500 to-fuchsia-700 text-rose-50 flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-rose-100/30 bg-rose-950/30 shadow-2xl shadow-rose-900/40 backdrop-blur-xl scale-90">
        <Outlet />
      </div>
    </div>
  )
}