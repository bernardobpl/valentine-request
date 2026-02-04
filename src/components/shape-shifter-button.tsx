import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

const MAX_DISTANCE = 100

function distanceToRect(px: number, py: number, rect: DOMRect): number {
  const dx = Math.max(rect.left - px, 0, px - (rect.left + rect.width))
  const dy = Math.max(rect.top - py, 0, py - (rect.top + rect.height))
  if (dx === 0 && dy === 0) return 0
  return Math.hypot(dx, dy)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

interface ShapeShifterButtonProps {
  className?: string
}

export const ShapeShifterButton = ({ className }: ShapeShifterButtonProps) => {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rafRef = useRef<number>(0)

  const updateProgress = useCallback((e: MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const d = distanceToRect(e.clientX, e.clientY, rect)
    const raw = d <= 0 ? 1 : clamp(1 - d / MAX_DISTANCE, 0, 1)
    setProgress(raw)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => updateProgress(e))
    }
    document.addEventListener("mousemove", onMove)
    return () => {
      document.removeEventListener("mousemove", onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateProgress])

  const r = Math.round(244 - (244 - 34) * progress)
  const g = Math.round(63 + (197 - 63) * progress)
  const b = 94
  const blendedBg = `rgb(${r} ${g} ${b})`
  
  const handleClick = () => {
    navigate('/accepted')
  }
  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={progress >= 0.5 ? "Accept" : "Decline"}
        className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg transition-[background-color] duration-150 ease-out"
        style={{
          backgroundColor: blendedBg,
        }}
        onClick={handleClick}
      >
        <span className="relative inline-block h-[1.2em] w-[4.5em] overflow-hidden">
          <span
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-out"
            style={{ opacity: 1 - progress }}
            aria-hidden
          >
            Decline
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-out"
            style={{ opacity: progress }}
            aria-hidden
          >
            Accept
          </span>
        </span>
      </button>
    </div>
  )
}
