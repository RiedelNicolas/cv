import './index.css';

const experience = [
  { role: 'Mobile Engineer', company: 'Mendel', dates: 'Nov 2024 – Present' },
  { role: 'Software Developer', company: 'Creative Coefficient', dates: 'Jun 2022 – Nov 2024' },
  { role: 'Software Developer', company: 'Tecnología y Desarrollo Informático', dates: 'Sept 2021 – Jun 2022' },
  { role: 'Teaching Assistant', company: 'University of Buenos Aires (UBA)', dates: 'Aug 2018 – Present' },
];

export function App() {
  return (
    <main className="page">
      <header className="intro">
        <h1>Nicolás Riedel</h1>
        <p className="muted">Software Engineer · Buenos Aires, Argentina</p>
        <nav className="links" aria-label="Contact">
          <a href="https://www.linkedin.com/in/nariedel/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/RiedelNicolas" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:nariedel99@gmail.com">Email</a>
        </nav>
      </header>

      <section className="bio">
        <p>Hi! I'm Nicolás, a software engineer based in Buenos Aires, Argentina.</p>
        <p>I'm currently a Mobile Engineer at Mendel, a B2B Fintech, working with React Native and Java Spring Boot.</p>
        <p>I have experience working across the entire stack, using multiple technologies and programming languages, and I'm always open to use what is necessary to get the job done.</p>
        <p>I also teach at Universidad de Buenos Aires (UBA), where I graduated in Software Engineering.</p>
      </section>

      <section>
        <h2>Experience</h2>
        <ul className="roles">
          {experience.map(({ role, company, dates }) => (
            <li key={`${role}-${company}`} className="role">
              <span className="role-title">{role}</span>
              <span className="muted dates">{dates}</span>
              <span className="muted company">{company}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Languages</h2>
        <p>Spanish (native), English (C1)</p>
      </section>

      <section>
        <h2>Education</h2>
        <p>Software Engineering, University of Buenos Aires, graduated Dec 2025</p>
      </section>

      <footer>
        <a href="/Nicolas-Riedel-CV.pdf" download className="pdf-link">
          Download CV (PDF)
        </a>
      </footer>
    </main>
  );
}
