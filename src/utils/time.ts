/**
 * Formats time in milliseconds as m:ss.cc (minutes:seconds.centiseconds).
 */
export const formatTime = (ms: number): string => {
  const totalSeconds = ms / 1000
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toFixed(2).padStart(5, '0')}`
}
