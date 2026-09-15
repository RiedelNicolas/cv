import './index.css';

export function App() {
  return (
    <div className="cv-container">
      <div>
        <h1 style={{ margin: '0 0 10px 0', color: '#fff' }}>NICOLÁS RIEDEL</h1>
        <div style={{ color: '#888' }}>Software Engineer • Buenos Aires, Argentina</div>
        
        <div className="contact-links" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <a href="https://www.linkedin.com/in/nariedel/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/RiedelNicolas" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:nariedel99@gmail.com">Email</a>
        </div>
      </div>

      <div className="section-title">
        ~/about<span className="cursor"></span>
      </div>
      
      <div className="job-description">
        <p>Hi! I'm Nicolás, a software engineer based in <b>Buenos Aires, Argentina</b>.</p>
        <p>I'm currently a <b>Mobile Engineer at Mendel</b>, a B2B Fintech, working with <b>React Native</b> and <b>Java Spring Boot</b>.</p>
        <p><b>I have experience working across the entire stack, using multiple technologies and programming languages</b>, and I'm always open to use what is necessary to get the job done.</p>
        <p>I also teach at <b>Universidad de Buenos Aires (UBA)</b>, where I graduated in <b>Software Engineering</b>.</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <a href="/Nicolas-Riedel-CV.pdf" target="_blank" rel="noopener noreferrer" className="download-btn">
          [ View full CV (PDF) ]
        </a>
      </div>
    </div>
  );
}
