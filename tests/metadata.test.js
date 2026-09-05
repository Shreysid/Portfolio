import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
test('metadata identifies one canonical public profile', () => {
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1)
  assert.match(html, /rel="canonical" href="https:\/\/shreyas\.ink\/"/)
  for (const key of ['description', 'robots', 'twitter:card', 'twitter:title', 'twitter:description']) {
    assert.match(html, new RegExp(`name="${key}" content="[^"\n]+"`))
  }
  for (const key of ['og:type', 'og:url', 'og:title', 'og:description']) {
    assert.match(html, new RegExp(`property="${key}" content="[^"\n]+"`))
  }
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  const person = data['@graph'].find(item => item['@type'] === 'Person')
  assert.equal(person.worksFor.name, 'StudioDrop')
  assert.equal(data['@graph'].find(item => item['@type'] === 'ProfilePage').mainEntity['@id'], person['@id'])
})

test('crawler files use the same canonical URL and omit section fragments', () => {
  const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8')
  assert.match(robots, /Sitemap: https:\/\/shreyas\.ink\/sitemap.xml/)
  assert.match(sitemap, /<loc>https:\/\/shreyas\.ink\/<\/loc>/)
  assert.equal((sitemap.match(/<loc>/g) || []).length, 1)
})
