import React, { useEffect, useRef, useState } from 'react'
import { drawTown } from './town.js'
import { stops, outcomes } from './content.js'
import { cameraAt } from './camera.js'

function Town({ progress, focus, rise, lookDown, reduced }) {
  const canvas = useRef(null), target = useRef({ progress, focus, rise, lookDown }), wake = useRef(() => {})
  useEffect(() => { target.current = { progress, focus, rise, lookDown }; wake.current() }, [progress, focus, rise, lookDown])
  useEffect(() => {
    const element = canvas.current, context = element.getContext('2d', { alpha: false })
    if (!context) return
    let width = 0, height = 0, current = { ...target.current }, frame = 0, last = 0, slowFrames = 0
    const constrained = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4 || navigator.connection?.saveData
    let quality = constrained ? 'lite' : 'auto'
    const render = time => {
      frame = 0
      if (document.hidden) return
      if (time - last < 33) { frame = requestAnimationFrame(render); return }
      last = time
      let moving = false
      for (const key of ['progress', 'focus', 'rise', 'lookDown']) {
        current[key] = reduced ? target.current[key] : current[key] + (target.current[key] - current[key]) * .22
        if (Math.abs(target.current[key] - current[key]) < .00015) current[key] = target.current[key]
        else moving = true
      }
      const started = performance.now()
      drawTown(context, width, height, reduced ? 0 : current.progress, slowFrames >= 3 ? 'lite' : quality, reduced ? 0 : current.focus, reduced ? 0 : current.rise, reduced ? 0 : current.lookDown)
      if (performance.now() - started > 20) slowFrames += 1
      if (slowFrames >= 3 && quality !== 'lite') { quality = 'lite'; resize() }
      if (moving && !frame) frame = requestAnimationFrame(render)
    }
    const start = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(render) }
    const resize = () => {
      const rect = element.getBoundingClientRect(), limit = quality === 'lite' ? 760 : 1100, scale = Math.min(1, limit / rect.width, 900 / rect.height)
      width = Math.round(rect.width * scale); height = Math.round(rect.height * scale)
      element.width = width; element.height = height; start()
    }
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else start() }
    wake.current = start
    const observer = new ResizeObserver(resize); observer.observe(element)
    document.addEventListener('visibilitychange', visibility)
    return () => { observer.disconnect(); cancelAnimationFrame(frame); wake.current = () => {}; document.removeEventListener('visibilitychange', visibility) }
  }, [reduced])
  return <canvas ref={canvas} className="town" aria-hidden="true" />
}

export default function App() {
  const [active, setActive] = useState(0)
  const [travel, setTravel] = useState(0)
  const [view, setView] = useState({ focus: 0, rise: 0, lookDown: 0 })
  const [progress, setProgress] = useState(0), [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const motion = () => setReduced(media.matches)
    motion(); media.addEventListener('change', motion)
    let pending = 0
    const scroll = () => { if (!pending) pending = requestAnimationFrame(() => {
      pending = 0
      setProgress(Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)))
      const workStart = document.getElementById('work').offsetTop
      const workEnd = document.getElementById('connect').offsetTop
      const experienceStart = document.getElementById('experience').offsetTop
      const y = window.scrollY, total = document.documentElement.scrollHeight - innerHeight
      const pose = cameraAt(y, { experience: experienceStart, studio: document.getElementById('studiodrop').offsetTop, work: workStart, lastProject: document.getElementById('sonicbits').offsetTop, connect: workEnd, total, viewport: innerHeight })
      setTravel(pose.progress); setView(pose)
      let nearest = 0, distance = Infinity
      document.querySelectorAll('.stop').forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const delta = Math.abs(rect.top + rect.height / 2 - innerHeight / 2)
        if (delta < distance) { distance = delta; nearest = index }
      })
      setActive(nearest)
    }) }
    scroll(); window.addEventListener('scroll', scroll, { passive: true }); window.addEventListener('resize', scroll)
    return () => { cancelAnimationFrame(pending); media.removeEventListener('change', motion); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll) }
  }, [])
  const inExperience = stops[active].group === 'experience'
  const workIndices = stops.map((stop, index) => ['work', 'demodag', 'sonicbits'].includes(stop.id) ? index : -1).filter(index => index >= 0)
  const inWork = workIndices.includes(active)
  const inBuilding = inExperience || inWork
  return <main className={inBuilding ? 'in-building' : ''}>
    <a className="skip" href="#work">Skip to selected work</a>
    <Town progress={travel} focus={view.focus} rise={view.rise} lookDown={view.lookDown} reduced={reduced} />
    <div className="grain" aria-hidden="true" />
    <header className="topbar"><nav aria-label="Districts">{['Home', 'About', 'Experience', 'Work', 'Connect'].map(name => <a key={name} href={`#${name.toLowerCase()}`} aria-current={(name === 'Experience' ? inExperience : name === 'Work' ? inWork : stops[active].id === name.toLowerCase()) ? 'location' : undefined}>{name}</a>)}</nav></header>
    <div className="location" aria-live="polite"><span>0{active + 1} / YOU ARE HERE</span><strong>{stops[active].district}</strong><span>{stops[active].street}</span></div>
    <aside className="map" aria-label="Journey progress"><div>LOCAL GRID <span>{Math.round(progress * 100)}%</span></div><svg viewBox="0 0 140 100" aria-hidden="true"><defs><pattern id="blocks" width="22" height="20" patternUnits="userSpaceOnUse"><path d="M2 2h13v12H2z" fill="none" stroke="currentColor" /></pattern></defs><rect width="140" height="100" fill="url(#blocks)" opacity=".35"/><path d="M70 96V4" fill="none" stroke="currentColor"/><circle cx="70" cy={94-progress*86} r="3" fill="#d9e5b0" /></svg><span>SCROLL TO EXPLORE ↓</span></aside>
    <div className="journey">{stops.map((stop, i) => <section className={`stop ${stop.group === 'experience' ? 'career-floor' : ''}`} id={stop.id} key={stop.id} aria-labelledby={`heading-${i}`}><article className="note">
      <span className="note-label">{stop.eyebrow}</span>
      {i === 0 ? <h1 id={`heading-${i}`}>{stop.title}</h1> : <h2 id={`heading-${i}`}>{stop.title}</h2>}
      {outcomes[stop.id] && <div className="outcome" aria-label="Outcome"><strong>{outcomes[stop.id].value}</strong><span>{outcomes[stop.id].label}</span><small>{outcomes[stop.id].context}</small></div>}
      {stop.description && <p>{stop.description}</p>}{stop.detail && <p className="detail">{stop.detail}</p>}
      {stop.role && <div className="career-meta"><h3>{stop.role}</h3><span>{stop.dates}</span></div>}
      {stop.tags.length > 0 && <ul className="tags" aria-label="Technologies and focus">{stop.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
      <div className="project-links">{stop.links.map(link => <a className="next" key={link.href} href={link.href} {...(link.href.startsWith('https:') ? { target: '_blank', rel: 'noreferrer' } : {})}>{link.label}<span aria-hidden="true">↗</span></a>)}</div>
      {i > 1 && i < stops.length - 1 && <a className="continue" href={`#${stops[i + 1].id}`}>{(stop.group === 'experience' && stops[i + 1].group === 'experience') || ['work', 'demodag'].includes(stop.id) ? 'Next floor' : 'Continue the walk'} ↓</a>}
    </article></section>)}</div><div className="frame" aria-hidden="true" />
  </main>
}
