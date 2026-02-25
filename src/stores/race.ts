import { useRaceProgram } from '@/composables/useRaceProgram'
import { useRaceSimulation } from '@/composables/useRaceSimulation'
import { defineStore } from 'pinia'

export const useRaceStore = defineStore('race', () => {
  const raceProgram = useRaceProgram()
  const raceSimulation = useRaceSimulation(raceProgram.rounds)

  const start = () => raceSimulation.start()
  const pause = () => raceSimulation.pause()
  const stop = () => raceSimulation.stop()

  const generateProgram = () => {
    raceSimulation.stop()
    raceProgram.generate()
  }

  return {
    horses: raceProgram.horses,
    rounds: raceProgram.rounds,
    displayRound: raceSimulation.displayRound,
    canStart: raceSimulation.canStart,
    canPause: raceSimulation.canPause,
    start,
    pause,
    stop,
    generateProgram,
  }
})
