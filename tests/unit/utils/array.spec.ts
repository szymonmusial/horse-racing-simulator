import { describe, expect, it, vi } from 'vitest'
import { shuffleArray } from '@/utils/array'

describe('shuffleArray', () => {
  it('should return new array instance with same elements', () => {
    const input = [1, 2, 3, 4]

    const result = shuffleArray(input)

    expect(result).not.toBe(input)
    expect(result).toHaveLength(input.length)
    expect([...result].sort()).toEqual([...input].sort())
  })

  it('should not mutate original array', () => {
    const input = ['a', 'b', 'c', 'd']
    const original = [...input]

    shuffleArray(input)

    expect(input).toEqual(original)
  })

  it('should use Math.random during shuffle', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.3)

    shuffleArray([1, 2, 3])

    expect(randomSpy).toHaveBeenCalled()
    randomSpy.mockRestore()
  })
})
