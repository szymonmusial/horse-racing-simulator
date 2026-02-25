import { describe, expect, it } from 'vitest'
import { formatTime } from '@/utils/time'

describe('formatTime', () => {
  it('should format milliseconds to m:ss.cc string', () => {
    const result = formatTime(1250)

    expect(result).toBe('0:01.25')
  })

  it('should include minute part for long duration', () => {
    const result = formatTime(61000)

    expect(result).toBe('1:01.00')
  })

  it('should preserve centisecond precision after rounding', () => {
    const result = formatTime(1999)

    expect(result).toBe('0:02.00')
  })
})
