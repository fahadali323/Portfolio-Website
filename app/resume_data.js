// --- Resume Data Structure (Updated for User) ---
export const DEFAULT_CONTENT = {
  header: {
    name: "Fahad Ali",
    title: "Software Engineer",
    email: "afahad630@gmail.com",
    phone: "(908) 875-0596",
    image: "/images/profile.jpg",
    links: {
      linkedin: "https://linkedin.com/in/fahad-ali-njit",
      github: "https://github.com/fahadali323",
      portfolio: "https://fahad-ali.cloud/",
    },
  },

  summary: {
    text: "Software Engineer with hands-on experience building full-stack applications using React, Vue, Node.js, Java, MySQL, and GCP. Strong understanding of web architecture, API design, and cloud deployment workflows. Experienced in both frontend and backend development, taught programming, and contributed to modernizing internal systems during internships. Passionate about distributed systems, AI/ML, and building scalable software solutions.",
    achievements: [
      "Delivered production-level features during multiple software engineering internships.",
      "Mentored students in full-stack development at IGo STEM Academy.",
      "Built major projects including BitFit, FilmApp, SimpleBank, and an enterprise-grade Polaris configurator tool.",
      "Currently developing a customizable resume website, ride-tracking app, and multithreaded data management system.",
    ],
  },

  experience: [
    {
      id: 1,
      title: "Long Term Teacher",
      company: "ESS",
      location: "Plainfield, New Jersey, USA",
      years: "May 2025 – Aug 2025",
      details: [
        "Refactored legacy ColdFusion backend and frontend logic to support migration to C# and Vue.js.",
        "Rebuilt the product configurator UI in Vue.js with real-time pricing validation, reducing user errors by 60%.",
        "Integrated C# backend APIs that improved response time by 45% through optimized session handling.",
        "Collaborated with cross-functional engineering teams to deliver features ahead of schedule for a system-wide launch.",
      ],
    },
    {
      id: 2,
      title: "Software Engineer Intern",
      company: "Thorlabs",
      location: "Newton, New Jersey, USA",
      years: "May 2025 – Aug 2025",
      details: [
        "Managed classroom activities and maintained a positive learning environment in the absence of the regular teacher.",
        "Delivered lesson plans and instructional materials effectively across various grade levels and subjects.",
        "Communicated with school staff regarding student progress, classroom issues, and lesson coverage.",
      ],
    },
        {
      id: 3,
      title: "Cashier",
      company: "GigiCupcakes",
      location: "New Jersey, USA",
      years: "Nov 2022 – Jan 2025",
      details: [
        "Processed customer transactions accurately and efficiently.",
        "Provided exceptional customer service in a fast-paced retail environment.",
        "Maintained organization and cleanliness of the workspace.",
      ],
    },
    {
      id: 4,
      title: "Software Engineer Intern",
      company: "Power Change Lives",
      location: "New Jersey, USA",
      years: "May 2024 – Aug 2024",
      details: [
        "Assisted the team lead in managing a cohort of 31 interns, improving communication and coordination.",
        "Provided technical support for weekly presentations and system demos.",
        "Helped interns understand PHP, JavaScript, and HTML concepts to strengthen their project contributions.",
      ],
    },
    {
      id: 5,
      title: "Web Developer Intern",
      company: "IGo STEM Academy",
      location: "New Jersey, USA",
      years: "Jan 2023 – May 2023",
      details: [
        "Developed components for an online tutoring platform using React and Node.js.",
        "Implemented responsive UI features and improved student interactions with the platform.",
        "Participated in daily Scrum meetings to align on project requirements and deliverables.",
      ],
    },
  ],

  skills: [
    {
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "PHP"],
    },
    {
      category: "Frontend Frameworks",
      items: [
        "React",
        "Vue.js",
        "Pinia",
        "Expo / React Native",
        "Tailwind CSS",
      ],
    },
    {
      category: "Backend & Databases",
      items: [
        "Node.js",
        "Express",
        "Java Spring Boot",
        "MySQL",
        "PostgreSQL",
        "Firestore",
      ],
    },
    {
      category: "Cloud, Tools & DevOps",
      items: [
        "Git / GitHub",
        "GCP",
        "Docker",
        "CI/CD",
        "Nginx",
        "Linux",
        "Networking Fundamentals",
      ],
    },
  ],

  experienceProjects: [
    // (Optional section if you later add experience-linked projects)
  ],

  education: [
    {
      degree: "M.S. in Computer Science",
      institution: "New Jersey Institue of Technology",
      years: "Jan 2025 – Present",
      details:
        "Advanced coursework in web-development and cloud computing.",
    },
    {
      degree: "B.S. in Computer Science",
      institution: "New Jersey Institute of Technology",
      years: "Sep 2020 – Dec 2024",
      details:
        "Focus in software engineering, distributed systems, and database management.",
    },
    {
      degree: "High School Diploma",
      institution: "Union High School",
      years: "Sep 2016 - May 2020",
      details: "General Education Courses",
    },
  ],

  projects: [
    {
      name: "BitFit Fitness App",
      description:
        "A fitness tracking application with dashboards, analytics, and workout planning.",
      tech: ["React", "Node.js", "SQL"],
    },
    {
      name: "FilmApp",
      description:
        "DVD rental platform supporting metadata, search, and catalog management.",
      tech: ["PHP", "MySQL", "JavaScript"],
    },
    {
      name: "SimpleBank",
      description:
        "Bank simulation app with account transfers, histories, and authentication.",
      tech: ["Java", "SQL"],
    },
    {
      name: "Polaris Mounting Post Configurator",
      description:
        "Enterprise production tool for configuring mounting products with ColdFusion + Vue integration.",
      tech: ["Vue.js", "Pinia", "ColdFusion", "JavaScript"],
    },
    {
      name: "Multithreaded Data Management System",
      description:
        "Spring Boot + MySQL application using thread pools, background workers, and concurrency-safe operations.",
      tech: ["Java", "Spring Boot", "MySQL"],
    },
  ],
};

/**
 * Simulates a fetch call to a single backend endpoint to retrieve resume content.
 */
export async function getResumeContent() {
  await new Promise((resolve) => setTimeout(resolve, 10));
  return DEFAULT_CONTENT;
}
