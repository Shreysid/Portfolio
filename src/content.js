// Resume-reported results and public project capabilities, not invented benchmarks.
export const outcomes = {
  experience: { value: '>30%', label: 'less static-asset delivery time', context: 'CDN integration at NeuroFlares.' },
  cisco: { value: '86%', label: 'less compile time', context: 'React build-tool migration for Nexus Dashboard.' },
  studiodrop: { value: 'Hundreds', label: 'of images processed concurrently', context: 'StudioDrop’s AI Catalogue pipeline.' },
  work: { value: '≈2 seconds', label: 'to first audio in an observed run', context: '13 ms text capture. App-reported timing from one run; hardware, text length, and model warm-up state were not recorded.' },
  demodag: { value: 'Cycle detection', label: 'check a workflow before building on it', context: 'Backend graph validation, with a canvas that persists between visits.' },
  sonicbits: { value: 'Released', label: 'from development to the App Store', context: 'An iOS app with a public product and support website.' },
}

export const experience = [
  { company: 'StudioDrop', role: 'Founding Full-Stack Engineer', dates: 'Apr 2026 — Present', summary: 'Own frontend, backend, and system design. Built an AI image-processing pipeline with Go, Python, PostgreSQL, and Redis.' },
  { company: 'Cisco', role: 'Full-Stack Engineer', dates: 'Nov 2024 — Apr 2026', summary: 'Built Spring Boot services for Cisco ISE and modernized Nexus Dashboard React apps, reducing compile time by 86%.' },
  { company: 'Independent', role: 'Freelance Developer', dates: '2024 · between roles', summary: 'Delivered freelance projects across web development and machine learning before joining Cisco.' },
  { company: 'NeuroFlares', role: 'Software Engineer Intern', dates: 'Sep 2023 — Feb 2024', summary: 'Led four engineers building a multiplayer game server. Improved asset delivery with a CDN and implemented pathfinding.' },
]

export const stops = [
  { id: 'home', district: 'BLUE HOUR', street: 'Welcome to my corner of the internet', eyebrow: 'SHREYAS SIDDARAJU / BANGALORE', title: 'Built with curiosity.', description: 'Full-Stack & iOS Engineer. Web products, native iOS apps, and the systems underneath.', tags: [], links: [{ label: 'Take a walk', href: '#about' }] },
  { id: 'about', district: 'THE BUILDER', street: 'A little about me', eyebrow: '01 / ABOUT', title: 'From interface to infrastructure.', description: 'I’m Shreyas, a Full-Stack and iOS Engineer. At StudioDrop, I’m the Founding Full-Stack Engineer. I build web products and native iOS apps, including the backend systems behind them.', tags: ['Go · Java · Python', 'React · Swift', 'AWS · Kubernetes'], links: [{ label: 'Where I’ve worked', href: '#experience' }] },
  ...[...experience].reverse().map((job, index) => ({
    id: ['experience', 'freelance', 'cisco', 'studiodrop'][index], group: 'experience',
    district: 'WORKING YEARS', street: `Floor 0${index + 1} / ${job.company === 'Independent' ? 'Freelance' : job.company}`,
    eyebrow: `02 / EXPERIENCE · FLOOR 0${index + 1}`, title: job.company === 'Independent' ? 'Freelance' : job.company,
    role: job.role, dates: job.dates, description: job.summary, tags: [], links: [],
  })),
  { id: 'work', district: 'PROJECT HOUSE', street: 'Floor 01 / Sotto', eyebrow: '03 / SELECTED WORK · FLOOR 01', title: 'Sotto', description: 'Select text anywhere on your Mac and hear it aloud. Local speech with Kokoro and FluidAudio; your text stays on-device after the initial model download.', detail: 'macOS preview · Configurable shortcuts and pronunciation', tags: ['Swift', 'Local speech'], links: [{ label: 'Explore Sotto', href: 'https://github.com/Shreysid/Sotto' }] },
  { id: 'demodag', district: 'PROJECT HOUSE', street: 'Floor 02 / demoDAG', eyebrow: 'SELECTED WORK · FLOOR 02', title: 'demoDAG', description: 'Draw a workflow, connect its nodes, and check for cycles. A React canvas backed by FastAPI and NetworkX graph validation.', tags: ['React', 'FastAPI', 'NetworkX'], links: [{ label: 'Read the source', href: 'https://github.com/Shreysid/demoDAG' }] },
  { id: 'sonicbits', district: 'PROJECT HOUSE', street: 'Floor 03 / SonicBits', eyebrow: 'SELECTED WORK · FLOOR 03', title: 'SonicBits', description: 'An iOS app I built and released on the App Store, with a Next.js product website.', detail: 'Public source covers the website, not the iOS app.', tags: ['iOS', 'Next.js'], links: [{ label: 'App Store', href: 'https://apps.apple.com/in/app/sonicbits/id6733229921' }, { label: 'Website source', href: 'https://github.com/Shreysid/SonicBits' }] },
  { id: 'connect', district: 'SIGNAL HOUSE', street: 'The conversation starts here', eyebrow: '04 / CONNECT', title: 'Have something in mind?', description: 'If you’re building a product or hiring an engineer, I’d be glad to hear about it.', tags: [], links: [{ label: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/shreyas-sid/' }, { label: 'Browse GitHub', href: 'https://github.com/Shreysid' }] },
]
