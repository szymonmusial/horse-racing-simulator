/** Base speed used in finish time formula (distance / (BASE_SPEED * conditionFactor * randomFactor)). */
export const BASE_SPEED = 200

/** Delay in ms before automatically starting the next round after the current one finishes. */
export const NEXT_ROUND_DELAY_MS = 2000

/** Base multiplier for condition factor when horse condition is 0. */
export const CONDITION_FACTOR_BASE = 0.8

/** Extra multiplier range from condition (condition/100 * this is added to CONDITION_FACTOR_BASE). */
export const CONDITION_FACTOR_RANGE = 0.4

/** Minimum random multiplier for finish time (1 = no variance). */
export const RANDOM_FACTOR_MIN = 0.9

/** Range of random multiplier above minimum; actual random factor is [RANDOM_FACTOR_MIN, RANDOM_FACTOR_MIN + RANDOM_FACTOR_RANGE]. */
export const RANDOM_FACTOR_RANGE = 0.2
