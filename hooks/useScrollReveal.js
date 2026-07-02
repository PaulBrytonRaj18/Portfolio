import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, ...options }
    )

    // Observe the element and all .reveal children
    const reveals = el.querySelectorAll('.reveal')
    if (el.classList.contains('reveal')) {
      observer.observe(el)
    }
    reveals.forEach((r) => observer.observe(r))

    return () => observer.disconnect()
  }, [])

  return ref
}
