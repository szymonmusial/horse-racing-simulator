import { computed } from 'vue'
import { useWindowSize } from '@/composables/useWindowSize'
import { BREAKPOINTS, type Breakpoint } from '@/constants/breakpoints'

/**
 * Provides reactive helpers for viewport breakpoint checks.
 */
export const useBreakpoints = () => {
  // -----------------------------------------------------------------------------
  // Source State
  // -----------------------------------------------------------------------------
  const { width } = useWindowSize()

  // -----------------------------------------------------------------------------
  // Predicate Helpers
  // -----------------------------------------------------------------------------
  /**
   * Checks if viewport is greater than or equal to selected breakpoint.
   *
   * @param breakpoint Breakpoint lower bound.
   */
  const greater = (breakpoint: Breakpoint) => {
    return computed(() => width.value >= BREAKPOINTS[breakpoint])
  }

  /**
   * Checks if viewport is smaller than selected breakpoint.
   *
   * @param breakpoint Breakpoint upper bound.
   */
  const smaller = (breakpoint: Breakpoint) => {
    return computed(() => width.value < BREAKPOINTS[breakpoint])
  }

  /**
   * Checks if viewport is in [breakpoint1, breakpoint2) range.
   *
   * @param breakpoint1 Inclusive lower bound.
   * @param breakpoint2 Exclusive upper bound.
   */
  const between = (breakpoint1: Breakpoint, breakpoint2: Breakpoint) => {
    return computed(() => greater(breakpoint1).value && smaller(breakpoint2).value)
  }

  // -----------------------------------------------------------------------------
  // Breakpoint Flags
  // -----------------------------------------------------------------------------
  const smDown = smaller('sm')
  const smUp = greater('sm')

  const mdDown = smaller('md')
  const mdUp = greater('md')

  const lgDown = smaller('lg')
  const lgUp = greater('lg')

  const xlDown = smaller('xl')
  const xlUp = greater('xl')

  const xxlDown = smaller('xxl')
  const xxlUp = greater('xxl')

  return {
    greater,
    smaller,
    between,
    smUp,
    mdUp,
    lgUp,
    xlUp,
    xxlUp,
    smDown,
    mdDown,
    lgDown,
    xlDown,
    xxlDown,
  }
}
