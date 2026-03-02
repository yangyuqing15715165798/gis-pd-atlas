import type { PrpdPoint, PrpdProfile } from './prpd'
import { generatePrpdPoints } from './prpd'

export type StreamState = {
  all: PrpdPoint[]
  shown: PrpdPoint[]
  cursor: number
}

export function initStream(args: { seed: number; profile: PrpdProfile; n: number; noise: number }): StreamState {
  const all = generatePrpdPoints({ seed: args.seed, profile: args.profile, n: args.n, noise: args.noise })
  return { all, shown: [], cursor: 0 }
}

export function stepStream(state: StreamState, batch: number): StreamState {
  const next = Math.min(state.all.length, state.cursor + batch)
  const shown = state.all.slice(0, next)
  return { ...state, shown, cursor: next }
}
