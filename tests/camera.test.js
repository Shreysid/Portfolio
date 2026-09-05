import test from 'node:test'
import assert from 'node:assert/strict'
import { cameraAt } from '../src/camera.js'
import { drawTown } from '../src/town.js'

const route = { experience: 1400, studio: 3500, work: 4200, lastProject: 5600, connect: 6300, total: 6600, viewport: 700 }

test('experience ascends, rooftop crossing stays high, work descends, connect faces road', () => {
  assert.equal(cameraAt(route.experience, route).rise, 0)
  assert.equal(cameraAt(route.studio, route).rise, 1)
  assert.equal(cameraAt(3900, route).rise, 1)
  assert.equal(cameraAt(route.work, route).rise, 1)
  assert.equal(cameraAt(4900, route).rise, .5)
  assert.equal(cameraAt(route.lastProject, route).rise, 0)
  assert.equal(cameraAt(route.connect, route).focus, 0)
  assert.equal(cameraAt(route.connect, route).lookDown, .85)
})

test('camera is continuous at route boundaries and reversible', () => {
  for (const y of [1400, 3500, 3675, 4200, 5600, 6300]) {
    const a = cameraAt(y - .001, route), b = cameraAt(y + .001, route)
    for (const key of Object.keys(a)) assert.ok(Math.abs(a[key] - b[key]) < .001, `${y}: ${key}`)
  }
  const positions = Array.from({ length: 101 }, (_, i) => i * 66)
  const forward = positions.map(y => cameraAt(y, route))
  assert.deepEqual(positions.reverse().map(y => cameraAt(y, route)).reverse(), forward)
})

test('drawing stays finite and bounded across desktop and compact profiles', () => {
  // Command-count guard only: a mock context cannot measure GPU/browser frame time.
  for (const [width, height, quality] of [[1100, 760, 'auto'], [760, 525, 'lite'], [390, 844, 'lite']]) {
    let maximum = 0
    for (let y = 0; y <= 6600; y += 110) {
      let calls = 0
      const check = (...args) => { calls++; for (const value of args) if (typeof value === 'number') assert.ok(Number.isFinite(value)) }
      const context = new Proxy({}, { get: (_, key) => key === 'createRadialGradient' ? () => ({ addColorStop() {} }) : check, set: () => true })
      const pose = cameraAt(y, route)
      drawTown(context, width, height, pose.progress, quality, pose.focus, pose.rise, pose.lookDown)
      maximum = Math.max(maximum, calls)
      assert.ok(calls < 60000, `Unbounded drawing: ${calls}`)
    }
    console.log(`${width}x${height} ${quality}: max ${maximum} canvas commands per sampled frame (not timing)`)
  }
})
