export type PrpdProfile =
  | 'internalVoid'
  | 'surface'
  | 'floating'
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

// deterministic RNG (Mulberry32)
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
  let u = 0,
    v = 0
  while (u === 0) u = rng()
  while (v === 0) v = rng()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

function sampleWindow(rng: () => number, centerDeg: number, spreadDeg: number) {
  return wrap360(centerDeg + gauss(rng) * spreadDeg)
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x))
}

export function generatePrpdPoints(args: GenArgs): PrpdPoint[] {
  const rng = mulberry32(args.seed)
  const pts: PrpdPoint[] = []

  const nNoise = Math.floor(args.n * args.noise)
  const nSig = Math.max(0, args.n - nNoise)

  // baseline noise
  for (let i = 0; i < nNoise; i++) {
    pts.push({ phaseDeg: rng() * 360, amp: clamp01(rng() ** 1.6) })
  }

  for (let i = 0; i < nSig; i++) {
    const u = rng()

    if (args.profile === 'noise') {
      // mostly random, with a faint window to teach "not all clouds are defects"
      const phaseDeg = rng() * 360
      const amp = clamp01(rng() ** 1.2)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'internalVoid') {
      const center = u < 0.5 ? 60 : 240
      const phaseDeg = sampleWindow(rng, center, 14)
      const amp = clamp01(0.25 + Math.abs(gauss(rng)) * 0.18 + rng() * 0.08)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'surface') {
      // broader + slightly skewed amplitude (creeping often has wider spread)
      const center = u < 0.5 ? 110 : 290
      const phaseDeg = sampleWindow(rng, center, 22)
      const amp = clamp01(0.18 + Math.abs(gauss(rng)) * 0.20 + rng() * 0.12)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'floating') {
      const center = u < 0.5 ? 90 : 270
      const phaseDeg = sampleWindow(rng, center, 28)
      const amp = clamp01(0.18 + Math.abs(gauss(rng)) * 0.22 + rng() * 0.12)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'particle') {
      const drift = Math.sin((i / nSig) * Math.PI * 2) * 18
      const center = u < 0.5 ? 70 + drift : 250 + drift
      const phaseDeg = sampleWindow(rng, center, 16)
      const amp = clamp01(0.22 + Math.abs(gauss(rng)) * 0.20 + rng() * 0.10)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'protrusion') {
      // sharper window near peaks, a bit stronger amplitude
      const center = u < 0.5 ? 40 : 220
      const phaseDeg = sampleWindow(rng, center, 12)
      const amp = clamp01(0.30 + Math.abs(gauss(rng)) * 0.22 + rng() * 0.10)
      pts.push({ phaseDeg, amp })
      continue
    }

    if (args.profile === 'intermittent') {
      // bursty: some points from windows, some missing
      const burst = rng() < 0.55
      if (!burst) {
        // skip generating a signal point ~ to create sparsity
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
      // mixture of internal + corona to teach "叠加"
      if (rng() < 0.55) {
        const center = u < 0.5 ? 60 : 240
        const phaseDeg = sampleWindow(rng, center, 14)
        const amp = clamp01(0.25 + Math.abs(gauss(rng)) * 0.18 + rng() * 0.08)
        pts.push({ phaseDeg, amp })
      } else {
        const center = u < 0.5 ? 30 : 210
        const phaseDeg = sampleWindow(rng, center, 18)
        const amp = clamp01(0.08 + Math.abs(gauss(rng)) * 0.12 + rng() * 0.06)
        pts.push({ phaseDeg, amp })
      }
      continue
    }

    if (args.profile === 'intensityLow' || args.profile === 'intensityHigh') {
      const center = u < 0.5 ? 60 : 240
      const phaseDeg = sampleWindow(rng, center, 14)
      const base = args.profile === 'intensityLow' ? 0.16 : 0.32
      const scale = args.profile === 'intensityLow' ? 0.14 : 0.22
      const amp = clamp01(base + Math.abs(gauss(rng)) * scale + rng() * 0.06)
      pts.push({ phaseDeg, amp })
      continue
    }

    // corona (default)
    const center = u < 0.5 ? 30 : 210
    const phaseDeg = sampleWindow(rng, center, 18)
    const amp = clamp01(0.08 + Math.abs(gauss(rng)) * 0.12 + rng() * 0.06)
    pts.push({ phaseDeg, amp })
  }

  return pts
}
