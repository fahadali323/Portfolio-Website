// --- Resume Data Structure (Updated for User) ---
export const DEFAULT_CONTENT = {
    header: {
        name: "Fahad Ali",
        title: "Software Engineer",
        email: "afahad630@gmail.com",
        phone: "(555) 987-6543",
        image: "/images/wheel.jpg", 
        links: {
            linkedin: "https://www.linkedin.com/in/fahad-ali-njit/",
            github: "https://github.com/fahadali323",
            portfolio: "https://fahad-ali.cloud/"
        }
    },
    summary: {
        text: "Software Engineer with hands-on experience building full-stack applications using React, Vue, Node.js, Java, MySQL, and GCP. Strong understanding of web architecture, API design, and cloud deployment workflows. Experienced in both frontend and backend development, taught programming at IGo STEM Academy, and contributed to modernizing internal systems during internships. Passionate about distributed systems, AI/ML, and developing clean, scalable software solutions.",
        achievements: [
            "Delivered production features as a Software Engineer Intern at Power Change Lives.",
            "Taught and mentored students in full-stack web development as a Web Developer Intern at IGo STEM Academy.",
            "Built multiple full-stack projects including BitFit fitness app, SimpleBank, FilmApp, and a Polaris configurator tool.",
            "Currently developing large projects such as a customizable resume website, and a multithreaded data management system."
        ]
    },
    experience: [
        {
            id: 1,
            title: "Software Engineer",
            company: "Thorlabs",
            location: "Newton, New Jersey, USA",
            years: "May 2025 – August 2025",
            details: [
                "Taught students JavaScript, React, APIs, and backend fundamentals.",
                "Built web-based educational tools used in classroom instruction.",
                "Designed interactive lessons around modern full-stack development."
            ]
        },
        {
            id: 2,
            title: "Software Engineer Intern",
            company: "Power Change Lives",
            location: "New Jersey, USA",
            years: "May 2024 - August 2024",
            details: [
                "Contributed to development of internal tools and automation workflows.",
                "Improved reliability of backend services and assisted in debugging production issues.",
                "Collaborated with the engineering team in Agile sprints and delivered features on time."
            ]
        },
        {
            id: 3,
            title: "Web Developer Intern",
            company: "IGo STEM Academy",
            location: "New Jersey, USA",
            years: "January 2023 – May 2023",
            details: [
                "Taught students JavaScript, React, APIs, and backend fundamentals.",
                "Built web-based educational tools used in classroom instruction.",
                "Designed interactive lessons around modern full-stack development."
            ]
        }
    ],
    skills: [
        { 
            category: "Programming Languages", 
            items: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "PHP"] 
        },
        { 
            category: "Frontend Frameworks", 
            items: ["React", "Vue.js", "Pinia", "Expo / React Native", "Tailwind CSS"] 
        },
        { 
            category: "Backend & Databases", 
            items: ["Node.js", "Express", "Java Spring Boot", "MySQL", "PostgreSQL", "Firestore"] 
        },
        { 
            category: "Cloud, Tools & DevOps", 
            items: ["Git / GitHub", "GCP", "Docker", "CI/CD", "Nginx", "Linux", "Networking Fundamentals"] 
        }
    ],
    experienceProjects: [
        // Optional (add if you want project-based section)
    ],
    education: {
        degree: "M.S. in Computer Science",
        institution: "New Jersey Institute of Technology",
        years: "2024 - present",
        details: ""
    },
    education: {
        degree: "B.S. in Computer Science",
        institution: "New Jersey Institute of Technology",
        years: "2020 – 2024",
        details: "Focus in software engineering, distributed systems, and database management."
    },
    projects: [
        {
            name: "BitFit Fitness App",
            description: "A fitness tracking application with dashboards, analytics, and workout planning.",
            tech: ["React", "Node.js", "SQL"]
        },
        {
            name: "FilmApp",
            description: "DVD rental platform supporting metadata, search, and catalog management.",
            tech: ["PHP", "MySQL", "JavaScript"]
        },
        {
            name: "SimpleBank",
            description: "Bank simulation app with account transfers, histories, and authentication.",
            tech: ["Java", "SQL"]
        },
        {
            name: "Polaris Mounting Post Configurator",
            description: "Production tool for dynamically configuring mounting products, with ColdFusion + Vue.js backend/frontend integration.",
            tech: ["Vue.js", "Pinia", "ColdFusion", "JavaScript"]
        },
        {
            name: "Multithreaded Data Management System",
            description: "Spring Boot + MySQL application using thread pools, file processing, and concurrency-safe data operations.",
            tech: ["Java", "Spring Boot", "MySQL"]
        }
    ]
};

/**
 * Simulates a fetch call to a single backend endpoint to retrieve resume content.
 */
export async function getResumeContent() {
    await new Promise(resolve => setTimeout(resolve, 10));
    return DEFAULT_CONTENT;
}
