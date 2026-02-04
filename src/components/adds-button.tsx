import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const TRIGGER_DISTANCE = 50
const LEAVE_DISTANCE = 180
const EXIT_ANIMATION_MS = 200

const FAKE_ADS = [
  {
    title: "You've been selected!",
    body: "Claim your free prize now. Click here to continue.",
    cta: "Claim prize",
  },
  {
    title: "Your device may be at risk",
    body: "Scan now to remove 47 viruses detected.",
    cta: "Scan now",
  },
  {
    title: "Take this short survey",
    body: "Answer 3 questions and get a $50 gift card.",
    cta: "Start survey",
  },
  {
    title: "Download our app",
    body: "Millions of users love it. Get it free today.",
    cta: "Download",
  },
  {
    title: "Limited time offer",
    body: "90% off premium subscription. Offer ends in 10 minutes.",
    cta: "Get offer",
  },
]

interface AddsButtonProps {
  className?: string
}
export const AddsButton = ({ className }: AddsButtonProps) => {
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayExiting, setOverlayExiting] = useState(false)
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null)
  const [adIndex, setAdIndex] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayExiting) return
    const id = setTimeout(() => {
      setOverlayVisible(false)
      setOverlayExiting(false)
      setButtonRect(null)
    }, EXIT_ANIMATION_MS)
    return () => clearTimeout(id)
  }, [overlayExiting])

  const checkProximity = useCallback((e: MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const distance = Math.hypot(dx, dy)

    if (distance < TRIGGER_DISTANCE) {
      setButtonRect(button.getBoundingClientRect())
      setOverlayExiting(false)
      setOverlayVisible(true)
    } else if (distance > LEAVE_DISTANCE && overlayVisible) {
      setOverlayExiting(true)
    }
  }, [overlayVisible])

  useEffect(() => {
    document.addEventListener("mousemove", checkProximity)
    return () => document.removeEventListener("mousemove", checkProximity)
  }, [checkProximity])

  const handleCloseAd = useCallback(() => {
    setAdIndex((i) => (i + 1) % FAKE_ADS.length)
  }, [])

  const ad = FAKE_ADS[adIndex]

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-rose-50 shadow-lg hover:bg-rose-400"
      >
        Decline
      </button>

      {overlayVisible &&
        buttonRect &&
        createPortal(
          <div
            className={`fixed z-10 flex origin-center items-center justify-center ${overlayExiting ? "ad-overlay-exit" : "ad-overlay-enter"}`}
            style={{
              left: buttonRect.left - 20,
              top: buttonRect.top,
              width: buttonRect.width + 100,
              height: buttonRect.height,
            }}
          >
            <div
              key={adIndex}
              className="relative w-full max-w-[260px] rounded-2xl border-2 border-amber-400/80 bg-amber-50 p-4 shadow-xl ad-card-enter"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={handleCloseAd}
                className="absolute right-2 top-2 rounded p-1 text-amber-800/80 hover:bg-amber-200/80 hover:text-amber-900"
              >
                <span className="text-lg leading-none">×</span>
              </button>
              <h3 className="pr-6 text-sm font-bold text-amber-900">{ad.title}</h3>
              <p className="mt-1 text-xs text-amber-800/90">{ad.body}</p>
              <button
                type="button"
                className="mt-3 w-full rounded-lg bg-amber-500 py-1.5 text-xs font-semibold text-amber-950"
                onClick={handleCloseAd}
              >
                {ad.cta}
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
