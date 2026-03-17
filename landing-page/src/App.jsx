const Icon = ({ name, title }) => {
  const props = {
    role: 'img',
    'aria-label': title,
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (name === 'github') {
    return (
      <svg {...props}>
        <path
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.49-1.1-1.49-.9-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 7.1c.83 0 1.67.12 2.45.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.21 2.44.1 2.7.64.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .26.18.58.69.48A10.2 10.2 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'link') {
    return (
      <svg {...props}>
        <path
          d="M10.59 13.41a1 1 0 0 1 0-1.41l3.18-3.18a1 1 0 1 1 1.41 1.41l-3.18 3.18a1 1 0 0 1-1.41 0Z"
          fill="currentColor"
        />
        <path
          d="M7.05 16.95a4.5 4.5 0 0 1 0-6.36l2.12-2.12a1 1 0 1 1 1.41 1.41l-2.12 2.12a2.5 2.5 0 0 0 3.54 3.54l2.12-2.12a1 1 0 1 1 1.41 1.41l-2.12 2.12a4.5 4.5 0 0 1-6.36 0Z"
          fill="currentColor"
        />
        <path
          d="M16.95 7.05a4.5 4.5 0 0 1 0 6.36l-2.12 2.12a1 1 0 1 1-1.41-1.41l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-2.12 2.12a1 1 0 1 1-1.41-1.41l2.12-2.12a4.5 4.5 0 0 1 6.36 0Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'mail') {
    return (
      <svg {...props}>
        <path
          d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.68-.5 4.98 4.32c.2.17.48.17.68 0L17.32 6H6.68Zm11.32 2.24-4.34 3.76a2.5 2.5 0 0 1-3.32 0L6 8.24V17.5c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5V8.24Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'calendar') {
    return (
      <svg {...props}>
        <path
          d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1H5Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <svg {...props}>
      <path
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5a1 1 0 1 0-2 0v.4c-1.47.26-2.5 1.3-2.5 2.74 0 1.9 1.6 2.55 3.12 3.02 1.44.44 1.88.7 1.88 1.32 0 .72-.74 1.18-1.9 1.18-1.1 0-1.87-.36-2.4-.76a1 1 0 1 0-1.2 1.6c.65.49 1.6.9 2.99 1.02V19a1 1 0 1 0 2 0v-.48c1.67-.28 2.9-1.36 2.9-3.02 0-1.98-1.63-2.62-3.18-3.1-1.45-.45-1.82-.7-1.82-1.24 0-.58.55-.95 1.5-.95.83 0 1.43.24 1.88.5a1 1 0 1 0 1.08-1.68c-.52-.33-1.27-.62-2.36-.76V7Z"
        fill="currentColor"
      />
    </svg>
  )
}

const projects = [
  {
    name: 'CN Budget',
    icon: 'finance',
    domain: 'cnbudget.xyz',
    status: 'Live',
    href: 'https://cnbudget.xyz',
    marks: [
      { symbol: '£', label: 'Money' },
      { symbol: '↗', label: 'Planning' },
      { symbol: '◎', label: 'Tracking' },
    ],
    accent: 'finance',
  },
  {
    name: 'Timetable One',
    icon: 'calendar',
    domain: 'jezisgay.xyz',
    status: 'Live',
    href: 'https://jezisgay.xyz',
    marks: [
      { symbol: '▦', label: 'Schedule' },
      { symbol: '⏱', label: 'Fast' },
      { symbol: '⌘', label: 'Simple' },
    ],
    accent: 'timetable',
  },
]

function App() {
  return (
    <div className="site-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      <div className="background-orb orb-three" />
      <div className="background-orb orb-four" />

      <main className="container">
        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow">cnicolson.xyz</p>
            <h1>Cam&apos;s Projects</h1>
            <p className="subhead">Two live builds. Tap in.</p>

            <div className="hero-actions">
              <a
                className="primary-action"
                href="https://github.com/CamNicolson"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="github" title="GitHub" />
                GitHub
              </a>
              <a className="secondary-action" href="mailto:scenicolson@gmail.com">
                <Icon name="mail" title="Email" />
                Email
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-top">
              <span className="panel-label">Live</span>
              <span className="panel-count">0{projects.length}</span>
            </div>

            <div className="project-strips" aria-label="Live sites">
              {projects.map((project) => (
                <a
                  key={project.name}
                  className={`project-strip ${project.accent}`}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="strip-icon" aria-hidden="true">
                    <Icon name={project.icon} title={project.name} />
                  </span>
                  <span className="strip-copy">
                    <strong>{project.name}</strong>
                    <small>{project.domain}</small>
                  </span>
                  <span className="strip-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </header>

        <section className="section">
          <div className="section-heading">
            <p>LIVE</p>
            <h2>Jump in</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.accent}`} key={project.name}>
                <div className="card-glow" />

                <div className="project-top">
                  <div className="project-icon" aria-hidden="true">
                    <Icon name={project.icon} title={project.name} />
                  </div>

                  <span className="status-badge">{project.status}</span>
                </div>

                <h3 className="project-title">{project.name}</h3>
                <div className="project-domain">{project.domain}</div>

                <div className="project-meta">
                  <div className="mark-row" aria-label="Project marks">
                    {project.marks.map((mark) => (
                      <span className="mark-tile" key={mark.label} title={mark.label} aria-label={mark.label}>
                        {mark.symbol}
                      </span>
                    ))}
                  </div>

                  <a className="project-button" href={project.href} target="_blank" rel="noreferrer">
                    <Icon name="link" title="Open" />
                    <span>Open</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} cnicolson.xyz</footer>
      </main>
    </div>
  )
}

export default App
