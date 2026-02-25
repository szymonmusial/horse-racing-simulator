import { onUnmounted } from 'vue'

/**
 * Tick callback.
 * Return true to stop the animation loop.
 */
type TickCallback = (elapsedMs: number) => boolean

/**
 * Provides start/pause/resume/stop controls for requestAnimationFrame loop.
 */
export const useAnimationLoop = () => {
  // -----------------------------------------------------------------------------
  // Loop State
  // -----------------------------------------------------------------------------
  let frameId: number | null = null
  let startTime = 0
  let accumulated = 0
  let onTick: TickCallback | null = null

  // -----------------------------------------------------------------------------
  // Internal Mechanics
  // -----------------------------------------------------------------------------

  /**
   * Indicates whether animation frame loop is active.
   */
  const isRunning = () => frameId !== null

  /**
   * Executes one animation frame and schedules next one if needed.
   */
  const tick = (timestamp: number) => {
    if (!onTick) return

    const elapsed = timestamp - startTime + accumulated

    const shouldStop = onTick(elapsed)

    if (shouldStop) {
      frameId = null
      return
    }

    frameId = requestAnimationFrame(tick)
  }

  // -----------------------------------------------------------------------------
  // Loop Controls
  // -----------------------------------------------------------------------------

  /**
   * Starts a new loop and resets elapsed time.
   */
  const start = (callback: TickCallback) => {
    stop()

    onTick = callback
    accumulated = 0
    startTime = performance.now()

    frameId = requestAnimationFrame(tick)
  }

  /**
   * Pauses active loop and preserves elapsed time.
   */
  const pause = () => {
    if (!isRunning()) return

    cancelAnimationFrame(frameId!)
    frameId = null

    accumulated += performance.now() - startTime
  }

  /**
   * Resumes a previously paused loop.
   */
  const resume = () => {
    if (!onTick || isRunning()) return

    startTime = performance.now()
    frameId = requestAnimationFrame(tick)
  }

  /**
   * Stops loop and clears internal callback/timing state.
   */
  const stop = () => {
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    onTick = null
    accumulated = 0
  }

  onUnmounted(stop)

  return {
    start,
    pause,
    resume,
    stop,
  }
}
