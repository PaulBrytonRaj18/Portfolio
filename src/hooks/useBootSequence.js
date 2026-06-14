import { useState, useEffect } from 'react'

const STEPS = [
  { msg: 'Loading profile...', delay: 0 },
  { msg: '✓ Full Stack Developer', delay: 500 },
  { msg: '✓ AI Integration Builder', delay: 1000 },
  { msg: '✓ Open Source Contributor', delay: 1700 },
  { msg: '✓ Hackathon Winner', delay: 2500 },
  { msg: 'System Ready.', delay: 3400 },
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
