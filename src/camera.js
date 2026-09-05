const clamp = value => Math.min(1, Math.max(0, value))
const between = (value, start, end) => clamp((value - start) / Math.max(1, end - start))
const smooth = value => value * value * (3 - 2 * value)

export function cameraAt(y, { experience, studio, work, lastProject, connect, total, viewport }) {
  const bridgeStart = studio + viewport * .25
  if (y < experience) return { progress: .28 * between(y, 0, experience), focus: smooth(between(y, experience - viewport * .4, experience)), rise: 0, lookDown: 0 }
  if (y < bridgeStart) return { progress: .28, focus: 1, rise: between(y, experience, studio), lookDown: 0 }
  if (y < work) return { progress: .28 + .37 * smooth(between(y, bridgeStart, work)), focus: 1, rise: 1, lookDown: 0 }
  if (y < lastProject) return { progress: .65, focus: 1, rise: 1 - between(y, work, lastProject), lookDown: 0 }
  const landing = smooth(between(y, lastProject, connect))
  return { progress: .65 + .08 * landing + .04 * between(y, connect, total), focus: 1 - landing, rise: 0, lookDown: .85 * landing }
}
