import { useEffect, useRef, useState } from "react"
import { RunAwayButton } from "../components/run-away-button"
import { AddsButton } from "../components/adds-button"
import { ShapeShifterButton } from "../components/shape-shifter-button"

export const Support = () => {
  const declineButtonsWrapperRef = useRef<HTMLDivElement>(null)

  const [declineButtonsWrapperLeft, setDeclineButtonsWrapperLeft] = useState<number | undefined>()
  console.log("🚀 ~ Support ~ declineButtonsWrapperLeft:", declineButtonsWrapperLeft)
  const [declineButtonsWrapperTop, setDeclineButtonsWrapperTop] = useState<number | undefined>()
  console.log("🚀 ~ Support ~ declineButtonsWrapperTop:", declineButtonsWrapperTop)

  useEffect(() => {
    if (declineButtonsWrapperRef.current) {
      setDeclineButtonsWrapperLeft(declineButtonsWrapperRef.current.getBoundingClientRect().left)
      setDeclineButtonsWrapperTop( declineButtonsWrapperRef.current.getBoundingClientRect().top)
    }
  }, [])

  return (
    <header className="border-b border-rose-100/20 px-8 pt-8 pb-5 overflow-visible">
      <h1 className="mt-2 text-3xl md:text-4xl font-semibold leading-tight text-center">
        Support
      </h1>
      <p>
        The decline button in the main page has a known issue. I'm working on a fix.
        Meanwhile you can try using one of those:
      </p>
      <div
        ref={declineButtonsWrapperRef}
        className="min-h-[120px] w-full rounded-xl border border-dashed border-rose-200/30 bg-rose-950/20 overflow-visible"
      >
        {
          declineButtonsWrapperLeft && declineButtonsWrapperTop && (
            <RunAwayButton initialLeft={declineButtonsWrapperLeft} initialTop={declineButtonsWrapperTop} />
          )
        }
        <AddsButton className='ml-60'/>
        <ShapeShifterButton className='ml-60'/>
      </div>
    </header>
  )
}