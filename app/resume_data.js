// --- Resume Data Structure (Simulated Backend Data) ---
export const DEFAULT_CONTENT = {
    header: {
        name: "Alex Johnson",
        title: "Senior Full Stack Developer",
        email: "alex.johnson@email.com",
        phone: "(555) 123-4567",
        links: {
            linkedin: "https://linkedin.com/in/alexjohnson",
            github: "https://github.com/alex-dev-aj",
            portfolio: "https://alexjohnson.io/portfolio"
        }
    },
    summary: {
        text: "Highly analytical and detail-oriented Senior Full Stack Developer with 8+ years of experience specializing in scalable web applications using modern JavaScript frameworks (React, Node.js). Proven ability to lead cross-functional teams, optimize application performance, and deliver robust, user-friendly solutions on time. Passionate about cloud infrastructure, real-time data processing, and clean code architecture.",
        achievements: [
            "Reduced cloud infrastructure costs by 25% through efficient containerization and service optimization.",
            "Mentored junior team members, resulting in a 40% increase in team code coverage and quality standards.",
            "Successfully managed the migration of monolithic applications to microservices architecture."
        ]
    },
    experience: [
        {
            id: 1,
            title: "Senior Software Engineer",
            company: "TechCorp Solutions",
            location: "San Francisco, CA",
            years: "2020 – Present",
            details: [
                "Led the development team of a core internal logistics application, resulting in a 30% reduction in processing time by migrating from a legacy Python stack to a modern Node.js/React architecture.",
                "Designed and implemented a real-time data synchronization service using WebSockets and Redis, handling peak traffic of 10,000 concurrent users.",
                "Managed cloud infrastructure (AWS) using Terraform, ensuring 99.9% uptime and compliance with security best practices."
            ]
        },
        {
            id: 2,
            title: "Full Stack Developer",
            company: "Innovative StartUpX",
            location: "Seattle, WA",
            years: "2017 – 2020",
            details: [
                "Developed and maintained core features for the company's public-facing e-commerce platform using vanilla JavaScript, PHP, and MySQL.",
                "Contributed to database design and query optimization, improving average page load speed by 1.5 seconds.",
                "Collaborated closely with the UI/UX team to translate wireframes into highly functional and accessible web interfaces."
            ]
        }
    ],
    skills: [
        { category: "Programming Languages", items: ["JavaScript (ES6+)", "Python", "TypeScript", "HTML5 / CSS3"] },
        { category: "Frontend Frameworks", items: ["React / Hooks", "Redux / Zustand", "Tailwind CSS", "Next.js"] },
        { category: "Backend & Databases", items: ["Node.js / Express", "PostgreSQL", "MongoDB", "Firestore"] },
        { category: "Tools & DevOps", items: ["Git / GitHub", "Docker / Kubernetes", "AWS / Terraform", "Jira / Agile"] }
    ],
    education: {
        degree: "B.S. in Computer Science",
        institution: "New Jersey Institue of Technology | Metropolis, USA",
        years: "2013 – 2017",
        details: "Concentration in Distributed Systems and Software Architecture. Graduated Summa Cum Laude."
    }
};

/**
 * Simulates a fetch call to a single backend endpoint to retrieve resume content.
 * @returns {Promise<object>} The resume content object.
 */
export async function getResumeContent() {
    // In a real application, this would be:
    // const response = await fetch('/api/resume/content');
    // return response.json();
    
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 10)); 
    return DEFAULT_CONTENT;
}