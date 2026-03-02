export type PrpdProfile = 'internalVoid' | 'floating' | 'particle' | 'corona'

export type PrpdPoint = {
  phaseDeg: number
  amp: number
}

type GenArgs = {
  seed: number
  profile: PrpdProfile
  n: number
  noise: number // 0..1 fraction
}

// simple deterministic RNG (Mulberry32)
function mulberry32(seed: number) {
  let t = seed >>> 0
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function wrap360(x: number) {
  let v = x % 360
  if (v < 0) v += 360
  return v
}

function gauss(rng: () => number) {
  // Box-Muller
  let u = 0,
    v = 0
  while (u === 0) u = rng()
  while (v === 0) v = rng()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

function sampleWindow(rng: () => number, centerDeg: number, spreadDeg: number) {
  return wrap360(centerDeg + gauss(rng) * spreadDeg)
}

export function generatePrpdPoints(args: GenArgs): PrpdPoint[] {
  const rng = mulberry32(args.seed)
  const pts: PrpdPoint[] = []

  const nNoise = Math.floor(args.n * args.noise)
  const nSig = Math.max(0, args.n - nNoise)

  for (let i = 0; i < nNoise; i++) {
    pts.push({ phaseDeg: rng() * 360, amp: Math.min(1, Math.max(0, rng() ** 1.5)) })
  }

  for (let i = 0; i < nSig; i++) {
    const u = rng()

    if (args.profile === 'internalVoid') {
      // two symmetric windows
      const center = u < 0.5 ? 60 : 240
      const phaseDeg = sampleWindow(rng, center, 14)
      const amp = Math.min(1, Math.max(0, 0.25 + Math.abs(gauss(rng)) * 0.18 + rng() * 0.08))
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'floating') {
      // broader windows + more variance
      const center = u < 0.5 ? 90 : 270
      const phaseDeg = sampleWindow(rng, center, 28)
      const amp = Math.min(1, Math.max(0, 0.18 + Math.abs(gauss(rng)) * 0.22 + rng() * 0.12))
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'particle') {
      // drifting center (simulate time drift by slowly moving window)
      const drift = (Math.sin((i / nSig) * Math.PI * 2) * 18)
      const center = u < 0.5 ? 70 + drift : 250 + drift
      const phaseDeg = sampleWindow(rng, center, 16)
      const amp = Math.min(1, Math.max(0, 0.22 + Math.abs(gauss(rng)) * 0.20 + rng() * 0.10))
      pts.push({ phaseDeg, amp })
      continue
    }

    // corona
    {
      const center = u < 0.5 ? 30 : 210
      const phaseDeg = sampleWindow(rng, center, 18)
      const amp = Math.min(1, Math.max(0, 0.08 + Math.abs(gauss(rng)) * 0.12 + rng() * 0.06))
      pts.push({ phaseDeg, amp })
    }
  }

  return pts
}
