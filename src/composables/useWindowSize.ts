import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Tracks viewport width and height.
 *
 * @returns Reactive `width` and `height` refs updated on window resize.
 */
export const useWindowSize = () => {
  // -----------------------------------------------------------------------------
  // Source State
  // -----------------------------------------------------------------------------
  const width = ref(0)
  const height = ref(0)

  // -----------------------------------------------------------------------------
  // Internal Helpers
  // -----------------------------------------------------------------------------
  const updateSize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  // -----------------------------------------------------------------------------
  // Lifecycle
  // -----------------------------------------------------------------------------
  onMounted(() => {
    if (typeof window === 'undefined') return
    updateSize()
    window.addEventListener('resize', updateSize)
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', updateSize)
  })

  return { width, height }
}
