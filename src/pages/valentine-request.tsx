import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const LAYOUT_CONTENT = {
  title: 'Valentine Request',
  message: 'Katusha, will you respectuflly be my Valentine?',
  description: "This is a unique opportunity to share love with your beloved Bernardinho Crocodinho.",
  chips: ['❤ Made with love', 'Valentine 2026', 'For Katusha', 'Aka Kateronička'],
  requirements: ['Are you the best Girlfriend?', 'Loves me', 'Wanna have fun'],
  tipsTitle: 'Little love tips',
  tips: [
    'Acting special works very well with me',
    'Cuddle at night is the best time together',
    'Being my cuti patuti increases my happiness significantly'
  ],
  moodLabel: 'Mood',
  moodDescription: 'Romantic, cuddly, and funny',
  footerMessage: 'Take my kisses when I blow them on you! 😘',
  footerHighlight: 'Valentine 2026',
}

export const ValentineRequest = () => {
  const navigate = useNavigate();
  const [acceptedRequirements, setAcceptedRequirements] = useState<string[]>([]);
  const isAllRequirementsAccepted = useMemo(() => {
    return LAYOUT_CONTENT.requirements.every((requirement) => acceptedRequirements.includes(requirement));
  },[acceptedRequirements]);

  const handleToggleRequirement = (requirement: string) => {
    if (acceptedRequirements.includes(requirement)) {
      setAcceptedRequirements(acceptedRequirements.filter((r) => r !== requirement));
    } else {
      setAcceptedRequirements([...acceptedRequirements, requirement]);
    }
  }

  const handleDecline = () => {
    if(confirm('Are you sure you want to decline?')) {
      if(confirm(`
        ERROR: Permission denied. Check your boyfriend support service.
        Do you want to continue to support service?`)){
          navigate('/support');
        } else {
          alert("I'm glad you're still here with me! Now you just need to accept 💖");
        }
      return;
    } else {
      alert("I'm glad you're still here with me! Now you just need to accept 💖");
    }
  }

  const handleAccept = () => {
    navigate('/accepted');
  }

  return (
      <>
        <header className="relative border-b border-rose-100/20 px-8 pt-8 pb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-100/80 px-6">
            {LAYOUT_CONTENT.title}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold leading-tight text-center">
            <span className="bg-linear-to-r from-rose-50 via-rose-200 to-amber-200 bg-clip-text font-extrabold text-transparent">
              {LAYOUT_CONTENT.message}
            </span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-rose-100/85 text-center">
            {LAYOUT_CONTENT.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-rose-100/80">
            {LAYOUT_CONTENT.chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1 rounded-full bg-rose-900/50 px-3 py-1 border border-rose-200/20 hover:bg-amber-200 hover:text-rose-900 transition-colors duration-300"
              >
                {chip}
              </span>
            ))}
          </div>
        </header>

        <main className="relative grid gap-6 px-8 py-6 md:grid-cols-[1.5fr,1fr] items-start">
          <section className="space-y-4 px-6">
            <div>
              <h2 className="text-sm font-semibold text-rose-50 mb-2">Requirements</h2>
              <ul>
                {LAYOUT_CONTENT.requirements.map((requirement) => (
                  <li key={requirement} className="flex items-center gap-2">
                    <input type="checkbox" checked={acceptedRequirements.includes(requirement)} onChange={() => handleToggleRequirement(requirement)} />
                    <label>{requirement}</label>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="hidden md:flex flex-col gap-4 border-l border-rose-100/10 pl-6 text-sm text-rose-100/90">
            <div className="rounded-2xl bg-rose-900/40 p-4 border border-rose-100/15">
              <h2 className="text-sm font-semibold text-rose-50">
                {LAYOUT_CONTENT.tipsTitle}
              </h2>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {LAYOUT_CONTENT.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-linear-to-br from-rose-400/20 to-fuchsia-500/20 p-4 border border-rose-100/25">
              <p className="text-xs uppercase tracking-[0.2em] text-rose-100/80">
                {LAYOUT_CONTENT.moodLabel}
              </p>
              <p className="mt-1 text-base font-medium">
                {LAYOUT_CONTENT.moodDescription}
              </p>
            </div>
          </aside>
        </main>

        <div className="flex justify-center gap-6">
          <button 
            className="cursor-pointer mb-4 w-2xs h-24 bg-linear-to-br from-gray-600 to-gray-900 p-4 border border-rose-100/25 shadow-lg shadow-black-900 drop-shadow-2xl brightness-90 hover:brightness-100 transition-brightness duration-300"
            onClick={() => handleDecline()}
          >
            Decline
          </button>
          <button
            className="cursor-pointer mb-4 w-2xs h-24 bg-green-500 shadow-lg shadow-black-900 drop-shadow-2xl brightness-90 hover:brightness-100 transition-brightness duration-300 disabled:bg-gray-400 disabled:brightness-110 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!isAllRequirementsAccepted}
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>

        <footer className="relative flex flex-wrap items-center justify-between gap-2 border-t border-rose-100/15 px-8 py-4 text-xs text-rose-100/75">
          <span className="px-6">{LAYOUT_CONTENT.footerMessage}</span>
          <span className="inline-flex items-center gap-1 px-6">
            <span className="font-semibold text-rose-50">
              {LAYOUT_CONTENT.footerHighlight}
            </span>
          </span>
        </footer>
      </>
  )
}