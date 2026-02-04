import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const RUN_DISTANCE = 50
const NUDGE_SPEED = 12
const EDGE_MARGIN = 40
const INITIAL_LEFT = EDGE_MARGIN + 24
const INITIAL_TOP = EDGE_MARGIN + 24
const EDGE_ZONE = 50
const DRIFT_STRENGTH = 2

interface RunAwayButtonProps {
  initialLeft?: number
  initialTop?: number
}

export const RunAwayButton = ({ initialLeft = INITIAL_LEFT, initialTop = INITIAL_TOP }: RunAwayButtonProps) => {
  const [position, setPosition] = useState({ left: initialLeft, top: initialTop })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  
  const onMouseMove = useCallback(
    (e: Event & { clientX: number, clientY: number }) => {
      const container = document.getElementById('root')
      const button = buttonRef.current
      if (!container || !button) return

      const rect = container.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      const btnRect = button.getBoundingClientRect()
      const bx = btnRect.left - rect.left + btnRect.width / 2
      const by = btnRect.top - rect.top + btnRect.height / 2

      const dx = mx - bx
      const dy = my - by
      const distance = Math.hypot(dx, dy)

      if (distance < RUN_DISTANCE && distance > 0) {
        const nx = dx / distance
        const ny = dy / distance
        const nudgeX = -nx * NUDGE_SPEED
        const nudgeY = -ny * NUDGE_SPEED

        setPosition((prev) => {
          const containerWidth = rect.width
          const containerHeight = rect.height
          const w = btnRect.width
          const h = btnRect.height

          const minLeft = EDGE_MARGIN
          const maxLeft = containerWidth - w - EDGE_MARGIN
          const minTop = EDGE_MARGIN
          const maxTop = containerHeight - h - EDGE_MARGIN

          let nextLeft = prev.left + nudgeX
          let nextTop = prev.top + nudgeY

          const inEdgeZoneLeft = nextLeft < minLeft + EDGE_ZONE || nextLeft > maxLeft - EDGE_ZONE
          const inEdgeZoneTop = nextTop < minTop + EDGE_ZONE || nextTop > maxTop - EDGE_ZONE
          if (inEdgeZoneLeft || inEdgeZoneTop) {
            const centerX = (containerWidth - w) / 2
            const centerY = (containerHeight - h) / 2
            nextLeft += (centerX - prev.left) * (DRIFT_STRENGTH / 100)
            nextTop += (centerY - prev.top) * (DRIFT_STRENGTH / 100)
          }

          nextLeft = Math.max(minLeft, Math.min(maxLeft, nextLeft))
          nextTop = Math.max(minTop, Math.min(maxTop, nextTop))

          return { left: nextLeft, top: nextTop }
        })
      }
    },
    []
  )

  useEffect(() => {
    const container = document.getElementById('root')
    if (!container) return
    rootRef.current = container as HTMLDivElement
    setReady(true)  
    container.addEventListener('mousemove', onMouseMove)
    return () => {
      container.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  const handleClick = () => {
    alert('Oh noo! Seems like this one is also bugged')
  }
  
  return (
    <>
      {ready && rootRef.current && createPortal( // eslint-disable-line
        <button
          ref={buttonRef}
          type="button"
          className="cursor-pointer fixed rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-rose-50 shadow-lg transition-none hover:bg-rose-400"
          style={{ left: position.left, top: position.top }}
          onClick={handleClick}
        >
          Decline
        </button>, 
      rootRef.current)} {/* eslint-disable-line */}
    </>
  )
}