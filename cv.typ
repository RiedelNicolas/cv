#import "@preview/silver-dev-cv:1.0.2": *

#show: cv.with(
  font-type: "PT Serif",
  continue-header: "false",
  name: "Nicolás Riedel",
  address: "Buenos Aires, Argentina",
  lastupdated: "false",
  pagecount: "true",
  contacts: (
    (text: "LinkedIn", link: "https://www.linkedin.com/in/nariedel/"),
    (text: "Github", link: "https://github.com/RiedelNicolas"),
    (text: "nariedel99@gmail.com", link: "mailto:nariedel99@gmail.com"),
  ),
)

// About
#section[About Me]
#descript[Software Engineer and UBA Teaching Assistant with a strong foundation in computer science principles. Experienced in mobile and full-stack development with a focus on Fintech and educational systems.]

#sectionsep

// Experience
#section("Experience")

#job(
  position: "Mobile Engineer",
  institution: [Mendel],
  location: "Buenos Aires, Argentina",
  date: "Nov 2024 – Present",
  description: [
    - Engineer core features for a high-traffic B2B Fintech application using #strong[React Native] and #strong[Java Spring Boot] for the BFF layer.
    - #strong[Lead the mobile implementation] of an #strong[Online Booking Tool (OBT)], architecting the mobile frontend and its integration with gateway services for major enterprise clients across Latin America.
    - Improved development efficiency and app stability by implementing #strong[automated builds (CI/CD)], automated testing, and #strong[Google Analytics] for data-driven product decisions.
    - Managed the identification and resolution of critical #strong[production issues], ensuring high availability for corporate users.
  ],
)

#job(
  position: "Software Developer",
  institution: [Creative Coefficient],
  location: "Buenos Aires, Argentina",
  date: "Jun 2022 – Nov 2024",
  description: [
    - Developed and maintained full-stack web and mobile applications using #strong[TypeScript, React Native, React, and Node.js].
    - Collaborated with #strong[US-based teams] in an English-only professional environment.
    - Participated in the full Agile lifecycle, contributing to #strong[sprint planning, task estimation,] and backlog refinement to ensure steady feature delivery.
    - Partnered with cross-functional teams to translate business requirements into scalable technical solutions.
  ],
)

#job(
  position: "Software Developer",
  institution: [Tecnología y Desarrollo Informático],
  location: "Buenos Aires, Argentina",
  date: "Sept 2021 – Jun 2022",
  description: [
    - Executed the full-stack migration of an institutional management system for a #strong[top-tier university], transitioning legacy Oracle Forms logic into a modern web paradigm.
    - Optimized and maintained the #strong[Oracle SQL] database, ensuring data consistency and performance throughout the architectural shift.
    - Redesigned complex administrative modules serving #strong[thousands of students], delivering an intuitive and responsive experience that significantly reduced the technical friction of the legacy system.
  ],
)

#job(
  position: "Teaching Assistant",
  institution: [University of Buenos Aires (UBA)],
  location: "Buenos Aires, Argentina",
  date: "Aug 2018 – Present",
  description: [
    - Preparation and grading of exams and practical assignments for Engineering courses.
    - Planning and teaching of lessons.
    - Development of a web platform for automated delivery and grading of assignments.
  ],
)

#sectionsep

// Skills
#section("Skills")
#oneline-title-item(
  title: "Proficient",
  content: [TypeScript, React Native, Node.js, React, Docker, Firebase, Linux],
)
#oneline-title-item(
  title: "Competent",
  content: [Java (Spring Boot), SQL, Python, FastAPI, CI/CD],
)
#oneline-title-item(
  title: "Foundational",
  content: [MongoDB, Kubernetes (K8s), AWS, AI Fundamentals, Data Science],
)
#oneline-title-item(
  title: "Languages",
  content: [Spanish (Native), English (Advanced / C1)],
)

#sectionsep

// Education
#section("Education")
#education(
  institution: [University of Buenos Aires],
  major: [Software Engineering],
  date: "Graduated Dec 2025",
  location: "Argentina",
)

#set document(author: "Nicolás Riedel", title: "Nicolás Riedel CV")
