const projects = [
  {
    name: 'CN Budget',
    tagline: 'Personal finance planner and budget dashboard',
    description:
      'A finance tool for tracking income, expenses, savings goals, and forward-looking plans in one clean dashboard.',
    status: 'Live now',
    href: 'https://cnbudget.xyz',
    domain: 'cnbudget.xyz',
    cta: 'Open finance app',
    accent: 'finance',
  },
  {
    name: 'Timetable One',
    tagline: 'Simple scheduling and timetable planning',
    description:
      'A streamlined timetable experience built for organizing classes, routines, and weekly planning without extra clutter.',
    status: 'Live now',
    href: 'https://jezisgay.xyz',
    domain: 'jezisgay.xyz',
    cta: 'Open timetable app',
    accent: 'timetable',
  },
]

function App() {
  return (
    <div className="site-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      <div className="background-grid" />

      <main className="container">
        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow">cnicolson.xyz</p>
            <h1>Launchpad for Cam&apos;s live projects.</h1>
            <p className="hero-description">
              A clean home base for the apps I&apos;m building and shipping. Browse the featured
              projects below and jump straight into each live site.
            </p>

            <div className="hero-actions">
              <a
                className="primary-action"
                href="https://github.com/CamNicolson"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub
              </a>
              <a className="secondary-action" href="mailto:scenicolson@gmail.com">
                Contact me
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-label">Currently featured</div>
            <div className="panel-stat">
              <span>Live projects</span>
              <strong>{projects.length}</strong>
            </div>
            <div className="mini-links">
              <a href="https://www.linkedin.com/in/camnicolson/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/CamNicolson" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="mailto:scenicolson@gmail.com">Email</a>
            </div>
          </aside>
        </header>

        <section className="section">
          <div className="section-heading">
            <p>FEATURED WORK</p>
            <h2>Current live projects</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.accent}`} key={project.name}>
                <div className="card-glow" />

                <div className="project-header">
                  <div>
                    <p className="project-tagline">{project.tagline}</p>
                    <h3>{project.name}</h3>
                  </div>
                  <span className="status-badge">{project.status}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-footer">
                  <div className="project-domain">{project.domain}</div>
                  <a
                    className="project-button"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="footer">Built as a simple, polished launch page for current work.</footer>
      </main>
    </div>
  )
}

export default App
