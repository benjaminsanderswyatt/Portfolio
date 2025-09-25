/* --- Data for the projects section ---*/


export const projectData = [
    {
        title: 'Devon Swimming ASA Website',
        description: 'Website redesign for Devon Swimming ASA with improved information architecture, accessibility, responsive mobile UX, and a custom WordPress build with new features.',
        tech: ['WordPress', 'Figma', 'Responsive Design', 'Accessibility'],
        image: '/images/projects/devon-swimming-600.webp',
        links: [
            { name: 'Live Site', url: 'https://devonswimming.org.uk' },
        ],
    },
    {
        title: 'Janus DVCS',
        description: 'Self-hosted distributed version control system with plugin-based CLI, RBAC, and Dockerised microservices',
        tech: ['C#', 'React', 'Docker', 'MySQL'],
        image: '/images/projects/janus-600.webp',
        links: [
            { name: 'Demo Video', url: 'https://www.youtube.com/watch?v=7Hoq75ns3S4' },
            { name: 'Docs', url: 'https://github.com/benjaminsanderswyatt/COMP3000-JanusVersionControl/blob/main/Documentation/Report/Janus_Version_Control_Report.pdf' },
            { name: 'GitHub', url: 'https://github.com/benjaminsanderswyatt/COMP3000-JanusVersionControl' },
        ],
    },
    {
        title: 'Ethereal Cloud',
        description: 'Containerised cloud storage system with 2FA, file sharing, Docker deployment, and persistent storage support',
        tech: ['ASP.NET Core', 'Docker', 'SQL'],
        image: '/images/projects/ethereal-600.webp',
        links: [
            { name: 'Demo Video', url: 'https://www.youtube.com/watch?v=nuUlZEnAcSo' },
            { name: 'Docs', url: 'https://github.com/benjaminsanderswyatt/COMP2003-CloudStorage/tree/main/Documentation' },
            { name: 'GitHub', url: 'https://github.com/benjaminsanderswyatt/COMP2003-CloudStorage' },
        ],
    },
    {
        title: 'E-Commerce Platform',
        description: 'Full-stack retail app with JWT auth, real-time inventory sync, and WebSocket-powered dynamic carts',
        tech: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
        image: '/images/projects/e-com-600.webp',
        links: [
            { name: 'Demo Video', url: 'https://www.youtube.com/watch?v=D0VSEjfihhk' },
            { name: 'GitHub', url: 'https://github.com/benjaminsanderswyatt/COMP3006-Fullstack' },
        ],
    },
];
