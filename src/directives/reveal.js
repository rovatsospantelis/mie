/**
 * v-reveal — fade + slide-in όταν το στοιχείο μπαίνει στο viewport.
 *
 * Χρήση:
 *   <section v-reveal>...</section>                    απλό
 *   <div v-reveal="i">...</div>                        stagger (index * REVEAL_RATE)
 *   <div v-reveal="{ delay: 300 }">...</div>           χειροκίνητο delay σε ms
 *
 * Ρύθμισε ρυθμό/διάρκεια εδώ — ισχύει παντού.
 */

const REVEAL_RATE = 120 // ms ανά στοιχείο στο stagger
const DURATION = '.8s'   // διάρκεια animation
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'

export const reveal = {
  mounted(el, binding) {
    let delay = 0
    const v = binding.value
    if (typeof v === 'number') delay = v * REVEAL_RATE
    else if (v && typeof v === 'object') delay = v.delay ?? (v.index ?? 0) * REVEAL_RATE

    const distance = window.innerWidth < 768 ? 28 : 48
    el.style.opacity = '0'
    el.style.transform = `translateY(${distance}px)`
    el.style.transition = `opacity ${DURATION} ease-out, transform ${DURATION} ${EASING}`
    el.style.transitionDelay = delay + 'ms'
    el.style.willChange = 'opacity, transform'

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'none'
            io.unobserve(el)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    )
    io.observe(el)
  },
}
