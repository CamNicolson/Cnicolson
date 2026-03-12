const projects = [
  {
    name: 'Finance Planner V2',
    tagline: 'Personal finance planning and net worth tracking',
    description:
      'A dashboard-style finance app for planning salary, savings, investments, loan payoff, and future projections.',
    status: 'In progress',
    href: '#',
    cta: 'View project',
  },
  {
    name: 'Task Manager',
    tagline: 'A task board for work and personal projects',
    description:
      'A task management app with dashboard stats, notes, time tracking, filters, and persistent storage.',
    status: 'In progress',
    href: 'https://jezisgay.xyz',
    cta: 'View project',
  },
]

function App() {
  return (
    <div className="site-shell">
      <main className="container">
        <header className="hero">
          <div className="hero-top">
            <div className="hero-copy">
              <p className="domain-pill">cnicolson.xyz</p>
              <h1>Cam's Coding Shit.</h1>
            </div>

            <div className="hero-links">
              <a href="https://github.com/CamNicolson" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/camnicolson/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="mailto:scenicolson@gmail.com">Email</a>
            </div>
          </div>

          <div className="stats">
            <div className="stat-card">
              <span>Projects listed</span>
              <strong>2</strong>
            </div>
          </div>
        </header>

        <section className="section">
          <div className="section-heading">
            <p>FEATURED WORK</p>
            <h2>Current projects</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-header">
                  <div>
                    <p className="project-tagline">{project.tagline}</p>
                    <h3>{project.name}</h3>
                  </div>
                  <span className="status-badge">{project.status}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <a className="project-button" href={project.href}>
                  {project.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <footer className="footer">
          Built as a launchpad for current work.
        </footer>
      </main>
    </div>
  )
}

export default App
