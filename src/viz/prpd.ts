export type PrpdProfile =
  | 'internalVoid'
  | 'surface'
  | 'floatingClassic'
  | 'floatingIn'
  | 'floatingOut'
  | 'particle'
  | 'protrusion'
  | 'intermittent'
  | 'noise'
  | 'multiSource'
  | 'intensityLow'
  | 'intensityHigh'
  | 'corona'

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

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x))
}

function gauss(rng: () => number) {
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
    pts.push({ phaseDeg: rng() * 360, amp: clamp01(rng() ** 1.6) })
  }

  for (let i = 0; i < nSig; i++) {
    const u = rng()

    if (args.profile === 'noise') {
      pts.push({ phaseDeg: rng() * 360, amp: clamp01(rng() ** 1.2) })
      continue
    }

    if (args.profile === 'internalVoid') {
      const center = u < 0.5 ? 55 : 235
      const phaseDeg = sampleWindow(rng, center, 16)
      const amp = clamp01(0.10 + Math.abs(gauss(rng)) * 0.30 + rng() * 0.06)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'surface') {
      const center = u < 0.5 ? 110 : 290
      const phaseDeg = sampleWindow(rng, center, 28)
      const amp = clamp01(0.10 + Math.abs(gauss(rng)) * 0.35 + rng() * 0.10)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'floatingClassic') {
      // user-approved "floating" sample: symmetric + broader windows + more variance (but still structured)
      const center = u < 0.5 ? 90 : 270
      const phaseDeg = sampleWindow(rng, center, 26)
      const amp = clamp01(0.20 + Math.abs(gauss(rng)) * 0.26 + rng() * 0.12)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'floatingIn' || args.profile === 'floatingOut') {
      // symmetric + explicit inner/outer-8 structure (kept as optional)
      const center = u < 0.5 ? 90 : 270
      const phaseDeg = sampleWindow(rng, center, 22)
      const delta = (((phaseDeg - center + 540) % 360) - 180)
      const norm = Math.min(1, Math.abs(delta) / 90)

      const base = 0.55
      const branch = rng() < 0.5 ? 1 : -1
      const shape = args.profile === 'floatingIn' ? 0.30 - 0.35 * norm : -0.10 + 0.45 * norm
      const amp = clamp01(base + branch * shape + gauss(rng) * 0.06)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'particle') {
      const phaseDeg = rng() * 360
      const amp = clamp01(0.06 + (rng() ** 0.65) * 0.85 * (0.6 + 0.4 * rng()) + gauss(rng) * 0.05)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'protrusion') {
      const center = u < 0.5 ? 40 : 220
      const phaseDeg = sampleWindow(rng, center, 12)
      const amp = clamp01(0.30 + Math.abs(gauss(rng)) * 0.22 + rng() * 0.10)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'intermittent') {
      const burst = rng() < 0.55
      if (!burst) {
        pts.push({ phaseDeg: rng() * 360, amp: clamp01(rng() ** 1.6) })
        continue
      }
      const center = u < 0.5 ? 75 : 255
      const phaseDeg = sampleWindow(rng, center, 18)
      const amp = clamp01(0.22 + Math.abs(gauss(rng)) * 0.25 + rng() * 0.14)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'multiSource') {
      if (rng() < 0.55) {
        const center = u < 0.5 ? 55 : 235
        const phaseDeg = sampleWindow(rng, center, 16)
        const amp = clamp01(0.10 + Math.abs(gauss(rng)) * 0.30 + rng() * 0.06)
        pts.push({ phaseDeg, amp })
      } else {
        const majorHalf = rng() < 0.8
        const center = majorHalf ? 210 : 30
        const spread = majorHalf ? 30 : 14
        const phaseDeg = sampleWindow(rng, center, spread)
        const amp = clamp01(
          (majorHalf ? 0.08 : 0.22) + Math.abs(gauss(rng)) * (majorHalf ? 0.10 : 0.14) + rng() * 0.05,
        )
        pts.push({ phaseDeg, amp })
      }
      continue
    }

    if (args.profile === 'intensityLow' || args.profile === 'intensityHigh') {
      const center = u < 0.5 ? 55 : 235
      const phaseDeg = sampleWindow(rng, center, 16)
      const base = args.profile === 'intensityLow' ? 0.12 : 0.26
      const scale = args.profile === 'intensityLow' ? 0.22 : 0.34
      const amp = clamp01(base + Math.abs(gauss(rng)) * scale + rng() * 0.06)
      pts.push({ phaseDeg, amp })
      continue
    }

    // corona
    // target: strong polarity effect. Main half-cycle: weak amplitude, wide phase, high repetition ("tower" dense at bottom).
    // severe: minor half-cycle: higher amplitude, narrower phase, fewer events.
    const majorHalf = rng() < 0.84
    const center = majorHalf ? 210 : 30
    const spread = majorHalf ? 34 : 12
    const phaseDeg = sampleWindow(rng, center, spread)

    let amp: number
    if (majorHalf) {
      // many low amps, a few medium (bottom-heavy)
      const r = rng()
      amp = clamp01(0.03 + (r ** 2.3) * 0.42 + Math.abs(gauss(rng)) * 0.05)
    } else {
      // fewer, but higher & narrower
      const r = rng()
      amp = clamp01(0.18 + (r ** 0.85) * 0.60 + Math.abs(gauss(rng)) * 0.06)
    }
    pts.push({ phaseDeg, amp })
  }

  return pts
}

