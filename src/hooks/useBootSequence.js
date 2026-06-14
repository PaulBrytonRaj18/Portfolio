import { useState, useEffect } from 'react'

const STEPS = [
  { msg: 'Loading profile...', delay: 0 },
  { msg: '✓ Full Stack Developer', delay: 300 },
  { msg: '✓ AI Integration Builder', delay: 600 },
  { msg: '✓ Open Source Contributor', delay: 900 },
  { msg: '✓ Hackathon Winner', delay: 1200 },
  { msg: 'System Ready.', delay: 1600 },
]

const STORAGE_KEY = 'portfolio_booted'

export function useBootSequence() {
  const [step, setStep] = useState(-1)
  const [done, setDone] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1')

  useEffect(() => {
    if (done) {
      setStep(STEPS.length)
      return
    }

    const timers = STEPS.map((s) =>
      setTimeout(() => setStep((prev) => Math.max(prev, STEPS.indexOf(s))), s.delay)
    )

    const finish = setTimeout(() => {
      setDone(true)
      sessionStorage.setItem(STORAGE_KEY, '1')
    }, STEPS[STEPS.length - 1].delay + 400)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finish)
    }
  }, [done])

  const skip = () => {
    setStep(STEPS.length)
    setDone(true)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  return { step, total: STEPS.length, done, skip }
}
