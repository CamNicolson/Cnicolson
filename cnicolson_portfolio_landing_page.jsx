export default function PortfolioLandingPage() {
  const projects = [
    {
      name: "Finance Planner V2",
      tagline: "Personal finance planning and net worth tracking",
      description:
        "A dashboard-style finance app for planning salary, savings buckets, investments, loan payoff, and future projections. Built around personal scenario modeling with room for Supabase-backed saving.",
      stack: ["Streamlit", "Python", "Pandas", "Matplotlib", "Supabase"],
      status: "In progress",
      href: "#finance-planner",
      cta: "View project",
    },
    {
      name: "Task Manager",
      tagline: "A task board for planning work and personal projects",
      description:
        "A Vite-based task manager with task states, notes, timesheet support, dashboard stats, local persistence, and optional Supabase integration.",
      stack: ["Vite", "JavaScript", "Supabase", "Chart.js"],
      status: "In progress",
      href: "#task-manager",
      cta: "View project",
    },
  ];

  const links = [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Email", href: "mailto:you@example.com" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_22%),linear-gradient(to_bottom,rgba(2,6,23,0.95),rgba(2,6,23,1))]" />

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 sm:px-8 lg:px-10">
        <header className="mb-16 flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex w-fit rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm text-sky-200">
                cnicolson.xyz
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                A home for the projects I’m building.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                This landing page gives your domain a clean front door and makes it easy to branch out to each app as you launch them.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 md:min-w-[320px] md:grid-cols-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-sky-400/40 hover:bg-slate-800"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm text-slate-400">Projects listed</p>
              <p className="mt-2 text-2xl font-semibold">2</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm text-slate-400">Primary use</p>
              <p className="mt-2 text-2xl font-semibold">Portfolio hub</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm text-slate-400">Domain</p>
              <p className="mt-2 text-2xl font-semibold">cnicolson.xyz</p>
            </div>
          </div>
        </header>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Featured work</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Current projects</h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.07]"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-sky-200">{project.tagline}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{project.name}</h3>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    {project.status}
                  </span>
                </div>

                <p className="text-sm leading-7 text-slate-300">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={project.href}
                  className="mt-8 inline-flex items-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition group-hover:translate-x-1"
                >
                  {project.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-2">
          <article id="finance-planner" className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Project 01</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Finance Planner V2</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              A finance planning tool for modeling income, savings buckets, investment growth, and loan payoff scenarios. It’s suited to ongoing personal finance tracking and forward planning.
            </p>
            <div className="mt-6 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4 text-sm text-sky-100">
              Best deployed separately as a Python/Streamlit app, then linked here from the main domain.
            </div>
          </article>

          <article id="task-manager" className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Project 02</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Task Manager</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              A task board with dashboard metrics, notes, time tracking, filters, and persistence. It’s a strong candidate for a static or front-end deployment and can sit on a subdomain or subpath.
            </p>
            <div className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4 text-sm text-violet-100">
              Best deployed as a Vite app, then linked here from the main domain.
            </div>
          </article>
        </section>

        <section className="mb-14 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Suggested structure</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">How to organize the domain</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">Main site</p>
              <p className="mt-2 font-medium text-white">cnicolson.xyz</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">This landing page and your bio/contact links.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">Finance app</p>
              <p className="mt-2 font-medium text-white">finance.cnicolson.xyz</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">A separate Streamlit deployment for Finance Planner V2.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">Task app</p>
              <p className="mt-2 font-medium text-white">tasks.cnicolson.xyz</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">A Vite deployment for your task manager app.</p>
            </div>
          </div>
        </section>

        <footer className="mt-auto border-t border-white/10 py-6 text-sm text-slate-400">
          Built as a simple launchpad for your active work.
        </footer>
      </main>
    </div>
  );
}
