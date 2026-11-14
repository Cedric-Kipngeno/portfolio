import { useEffect, useMemo, useState } from 'react'
import { profile, projectMeta, fallbackRepos } from './config.js'

const CATEGORIES = ['Featured', 'All', 'Web', 'Mobile', 'Backend', 'AI & Data']

function enrichRepo(repo) {
  const meta = projectMeta[repo.name] || {}
  return {
    name: repo.name,
    html_url: repo.html_url,
    language: repo.language || meta.stack?.[0] || 'Code',
    stargazers_count: repo.stargazers_count ?? 0,
    updated_at: repo.updated_at,
    category: meta.category || guessCategory(repo.language),
    featured: meta.featured ?? false,
    summary:
      repo.description ||
      meta.summary ||
      `Source code and implementation for ${repo.name} on GitHub.`,
    stack: meta.stack || (repo.language ? [repo.language] : []),
  }
}

function guessCategory(lang) {
  if (lang === 'Kotlin') return 'Mobile'
  if (lang === 'Jupyter Notebook') return 'AI & Data'
  if (lang === 'Python') return 'Backend'
  if (lang === 'C') return 'Systems'
  return 'Web'
}

export default function App() {
  const [repos, setRepos] = useState(fallbackRepos)
  const [activeTab, setActiveTab] = useState('Featured')
  const [search, setSearch] = useState('')
  const [liveCount, setLiveCount] = useState(21)

  useEffect(() => {
    if (!profile.github) return
    fetch(`https://api.github.com/users/${profile.github}/repos?sort=updated&per_page=100`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!Array.isArray(data) || !data.length) return
        setLiveCount(data.length)
        const enriched = data
          .filter((r) => !r.fork)
          .map(enrichRepo)
          .sort((a, b) => {
            if (a.featured !== b.featured) return a.featured ? -1 : 1
            return new Date(b.updated_at) - new Date(a.updated_at)
          })
        setRepos(enriched)
      })
      .catch(() => {})
  }, [])

  const filteredProjects = useMemo(() => {
    return repos.filter((p) => {
      const matchesTab =
        activeTab === 'All'
          ? true
          : activeTab === 'Featured'
          ? p.featured
          : p.category === activeTab
      const q = search.trim().toLowerCase()
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.stack.some((t) => t.toLowerCase().includes(q))
      return matchesTab && matchesQuery
    })
  }, [repos, activeTab, search])

  return (
    <div className="page">
      <div className="bg-glow" aria-hidden="true" />

      <header className="nav">
        <a href="#top" className="brand">
          <span className="brand-dot" />
          <span>{profile.name}</span>
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="nav-gh"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="badge">
              <span className="pulse" /> Available for projects &amp; collaborations
            </div>
            <h1>
              Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
            </h1>
            <p className="subtitle">{profile.title}</p>
            <p className="lead">{profile.tagline}</p>

            <div className="hero-actions">
              <a className="btn primary" href="#projects">
                Explore Projects
              </a>
              <a className="btn ghost" href="#contact">
                Contact Me
              </a>
              <a
                className="btn ghost"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                @{profile.handle} on GitHub ↗
              </a>
            </div>

            <div className="stats-row">
              <div className="stat">
                <strong>{liveCount}</strong>
                <span>Public Repos</span>
              </div>
              <div className="stat">
                <strong>5+</strong>
                <span>Languages</span>
              </div>
              <div className="stat">
                <strong>Web · Mobile · AI</strong>
                <span>Full-Stack Scope</span>
              </div>
            </div>
          </div>

          <div className="hero-avatar-wrap">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="hero-avatar"
            />
            <div className="avatar-caption">
              <code>github.com/{profile.handle}</code>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="section-header">
            <span className="section-eyebrow">01 / About</span>
            <h2>What I Build</h2>
          </div>
          <div className="about-grid">
            <p className="about-bio">{profile.bio}</p>
            <div className="pillars">
              <div className="pillar">
                <h3>🌐 Web Applications</h3>
                <p>
                  Interactive storefronts and apps with React, Next.js, Tailwind CSS, and Bootstrap — such as{' '}
                  <strong>CoinVert</strong>, <strong>Apexgadgets</strong>, and <strong>SokoGarden</strong>.
                </p>
              </div>
              <div className="pillar">
                <h3>📱 Mobile &amp; APIs</h3>
                <p>
                  Native Android experiences in <strong>Kotlin</strong> paired with <strong>Python Flask &amp; MySQL</strong> REST APIs for end-to-end marketplaces and wellness apps.
                </p>
              </div>
              <div className="pillar">
                <h3>🤖 Computer Vision &amp; Data</h3>
                <p>
                  Real-time hand-tracking with <strong>MediaPipe &amp; OpenCV</strong> (<strong>AirCanvas</strong>), conversational tools (<strong>HealthBot</strong>), and ML classification notebooks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="section-header">
            <span className="section-eyebrow">02 / GitHub Portfolio</span>
            <div className="section-title-row">
              <h2>Projects</h2>
              <span className="repo-counter">
                Showing {filteredProjects.length} of {repos.length} repositories
              </span>
            </div>
          </div>

          <div className="controls">
            <div className="tabs" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`tab ${activeTab === cat ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="search"
              className="search-input"
              placeholder="Filter by name or tech (e.g. Kotlin, React, OpenCV)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid">
            {filteredProjects.map((p) => (
              <article key={p.name} className="card">
                <div className="card-top">
                  <span className="category-pill">{p.category}</span>
                  {p.stargazers_count > 0 && (
                    <span className="star-badge" title="GitHub Stars">
                      ★ {p.stargazers_count}
                    </span>
                  )}
                </div>

                <h3>
                  <a href={p.html_url} target="_blank" rel="noreferrer">
                    {p.name}
                  </a>
                </h3>

                <p className="card-desc">{p.summary}</p>

                <div className="card-footer">
                  <div className="tags">
                    {p.stack.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="repo-link"
                  >
                    Code ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <div className="section-header">
            <span className="section-eyebrow">03 / Tech Stack</span>
            <h2>Skills &amp; Technologies</h2>
          </div>

          <div className="skills-grid">
            {profile.skillGroups.map((group) => (
              <div key={group.category} className="skill-card">
                <h3>{group.category}</h3>
                <div className="tags">
                  {group.items.map((skill) => (
                    <span key={skill} className="tag skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="contact-box">
            <span className="section-eyebrow">04 / Get In Touch</span>
            <h2>Let&apos;s build something together</h2>
            <p>
              Reach out directly via email or phone/WhatsApp, or check out my latest repositories on GitHub.
            </p>

            <div className="contact-cards">
              {profile.email && (
                <a className="contact-card" href={`mailto:${profile.email}`}>
                  <span className="contact-label">Email</span>
                  <strong>{profile.email}</strong>
                </a>
              )}
              {profile.phone && (
                <a className="contact-card" href={`tel:${profile.phone}`}>
                  <span className="contact-label">Phone / Call</span>
                  <strong>{profile.phoneDisplay || profile.phone}</strong>
                </a>
              )}
              {profile.phone && (
                <a
                  className="contact-card"
                  href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-label">WhatsApp</span>
                  <strong>Message on WhatsApp ↗</strong>
                </a>
              )}
            </div>

            <div className="hero-actions">
              {profile.email && (
                <a className="btn primary" href={`mailto:${profile.email}`}>
                  Send an Email ✉
                </a>
              )}
              {profile.phone && (
                <a className="btn ghost" href={`tel:${profile.phone}`}>
                  Call {profile.phoneDisplay || profile.phone}
                </a>
              )}
              <a
                className="btn ghost"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub (@{profile.handle}) ↗
              </a>
              {profile.linkedin && (
                <a
                  className="btn ghost"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with React &amp; Vite · Synced with{' '}
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            @{profile.handle}
          </a>
        </p>
      </footer>
    </div>
  )
}
