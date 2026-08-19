import type {SocialLinkProps, ContentBlockProps, ButtonLinksProps, Skills, AcademicCardProps, ProjectCardProps, LinkItems} from '../../interfaces/interface.ts'

export const headerItems: LinkItems[] = [
    {text:"Inicio", href:"/"},
    {text:"Habilidades", href:"/skills"},
    {text:"Formación", href:"/education"},
    {text:"Proyectos", href:"/projects"}
]

export const socials: SocialLinkProps[] = [
    {
        icon: "/images/github-icon.svg",
        url: "https://github.com/dan8a112",
        height: "45px",
        width: "45px",
        altText: "Icono de github"
    },
    {
        icon: "/images/linkedin-icon.svg",
        url: "https://www.linkedin.com/in/daniel-ochoa-is/",
        height: "45px",
        width: "45px",
        altText: "Icono de linkedin"
    }
]

export const contentBlocks: ContentBlockProps[] = [
    {
        title: "Trayectoria profesional",
        paragraph: "He trabajado tanto en <strong>desarrollo web</strong>, abarcando frontend y backend, como en proyectos de <strong>analítica e ingeniería de datos</strong>, utilizando tecnologías como SQL, Python, Databricks y Tableau. Estas experiencias me han permitido ampliar mi perfil técnico, comprender distintas etapas del ciclo de desarrollo y procesamiento de datos, y fortalecer habilidades como el <strong>trabajo en equipo y la resolución de problemas</strong>.",
        image: "/images/programming-ill.png",
        imageAlt: "Programacion ilustracion",
        imageRight: false
    },
    {
        title: "Ciencia y Libros",
        paragraph: "Además de mi pasión por la programación, soy un entusiasta de la <strong>ciencia y la literatura</strong>. Disfruto de un buen café mientras leo libros que van desde <strong>fantasía y ciencia ficción hasta temas científicos </strong>que exploran los misterios del universo. Para mí, la lectura no solo es una fuente de inspiración, sino también una forma de relajarme y mantener mi mente activa.",
        image: "/images/books-ill.png",
        imageAlt: "Ciencia y libros ilustracion",
        imageRight: true
    }
]

export const buttons: ButtonLinksProps[] = [
    {
        text: "Proyectos",
        href: "/projects"
    },
    {
        text: "Habilidades",
        href: "/skills"
    }
]

export const skills: Skills = {
    "Datos y BI": [
        {
            text: "Tableau",
            percentage: 0.4,
            endText: "40%"
        },
        {
            text: "Databricks",
            percentage: 0.4,
            endText: "40%"
        },
        {
            text: "PySpark",
            percentage: 0.4,
            endText: "40%"
        },
        {
            text: "Medallion Architecture",
            percentage: 0.3,
            endText: "30%"
        },
        {
            text: "Microsoft Purview",
            percentage: 0.3,
            endText: "30%"
        },
        {
            text: "SQL",
            percentage: 0.5,
            endText: "50%"
        },
        {
            text: "SQL Server",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/mysql-icon.svg",
            text: "MySQL",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/oracle-icon.svg",
            text: "Oracle",
            percentage: 0.3,
            endText: "30%"
        }
    ],
    "Lenguajes de Programación": [
        {
            text: "Python",
            percentage: 0.5,
            endText: "50%"
        },
        {
            icon: "/images/javascript-icon.svg",
            text: "JavaScript",
            percentage: 0.5,
            endText: "50%"
        },
        {
            icon: "/images/java-icon.svg",
            text: "Java",
            percentage: 0.4,
            endText: "40%"
        },
        {
            text: "C#",
            percentage: 0.3,
            endText: "30%"
        },
        {
            icon: "/images/kotlin-icon.svg",
            text: "Kotlin",
            percentage: 0.3,
            endText: "30%"
        },
        {
            icon: "/images/php-icon.svg",
            text: "PHP",
            percentage: 0.2,
            endText: "20%"
        }
    ],
    "Frontend": [
        {
            text: "HTML",
            percentage: 0.5,
            endText: "50%"
        },
        {
            icon: "/images/css-icon.svg",
            text: "CSS",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/react-icon.svg",
            text: "React",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/nextjs-icon.svg",
            text: "Next.js",
            percentage: 0.3,
            endText: "30%"
        },
        {
            icon: "/images/astrojs-icon.svg",
            text: "Astro.js",
            percentage: 0.2,
            endText: "20%"
        },
        {
            icon: "/images/bootstrap-icon.svg",
            text: "Bootstrap",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/tailwind-icon.svg",
            text: "Tailwind",
            percentage: 0.2,
            endText: "20%"
        },
        {
            icon: "/images/mui-icon.svg",
            text: "Material UI",
            percentage: 0.25,
            endText: "25%"
        },
        {
            text: "Styled Components",
            percentage: 0.3,
            endText: "30%"
        }
    ],
    "Backend": [
        {
            text: "ASP.NET Core",
            percentage: 0.4,
            endText: "40%"
        },
        {
            text: "FastAPI",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/laravel-icon.svg",
            text: "Laravel",
            percentage: 0.2,
            endText: "20%"
        },
        {
            text: "NestJS",
            percentage: 0.3,
            endText: "30%"
        },
        {
            icon: "/images/springboot-icon.svg",
            text: "Spring Boot",
            percentage: 0.4,
            endText: "40%"
        }
    ],
    "DevOps y Herramientas": [
        {
            text: "Git",
            percentage: 0.5,
            endText: "50%"
        },
        {
            text: "Docker",
            percentage: 0.3,
            endText: "30%"
        },
        {
            text: "Azure DevOps",
            percentage: 0.3,
            endText: "30%"
        },
        {
            text: "APIs REST",
            percentage: 0.4,
            endText: "40%"
        }
    ],
    "Diseño": [
        {
            icon: "/images/figma-icon.svg",
            text: "Figma",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/illustrator-icon.svg",
            text: "Adobe Illustrator",
            percentage: 0.25,
            endText: "25%"
        }
    ],
    "Idiomas": [
        {
            text: "Español",
            percentage: 1,
            endText: "Nativo"
        },
        {
            text: "Inglés",
            percentage: 0.4,
            endText: "B1"
        }
    ]
}

export const languages: Skills = {
    "Idiomas": [
        {
            text: "Español",
            percentage: 1, 
            endText: "Nativo"
        },
        {
            text: "Inglés",
            percentage: 0.4, 
            endText: "Nivel B1"
        }
    ]
}

export const education: AcademicCardProps[] = [
    {
        image: "/images/unah-logo.jpg",
        title: "Universidad Nacional Autónoma de Honduras",
        subtitle: "Ingeniería en Sistemas",
        footText: "2021-2026"
    },
]

export const professionalCertifications: AcademicCardProps[] = [
    {
        image: "/images/certificates/databricks-analyst-cert.png",
        title: "Databricks Certified Data Analyst Associate",
        subtitle: "Databricks Academy",
        footText: "Agosto 2026 - Agosto 2028"
    },
]

export const coursesAccreditations: AcademicCardProps[] = [
    {
        image: "/images/certificates/databricks-aibi-analyst.png",
        title: "Data Analyst Learning Plan: AI/BI Genie & SQL",
        subtitle: "Databricks",
        footText: "Marzo 2026"
    },
    {
        image: "/images/certificates/databricks-fundamentals.png",
        title: "Academy Accreditation: Databricks Fundamentals",
        subtitle: "Databricks",
        footText: "Marzo 2026"
    },
    {
        image: "/images/certificates/tableau-az-udemy.jpg",
        title: "Tableau de la A a la Z: Domina Tableau",
        subtitle: "Udemy",
        footText: "Mayo 2026"
    },
    {
        image: "/images/certificates/power-bi-santander.jpg",
        title: "Fundamentos de Power BI",
        subtitle: "Santander Open Academy",
        footText: "Agosto 2026"
    },
    {
        image: "/images/cisco-logo.png",
        title: "CCNA 1: Introduction to Networks",
        subtitle: "Cisco",
        footText: "Diciembre 2024",
        href: "https://www.credly.com/badges/f866d20a-1a1b-4114-a939-8dfc7715d1b4/linked_in_profile"
    },
    {
        image: "/images/cisco-logo.png",
        title: "Python Essentials 1",
        subtitle: "Cisco",
        footText: "Mayo 2024"
    },
    {
        image: "/images/alura-logo.png",
        title: "Formación Front-end Oracle Next Education",
        subtitle: "Oracle & Alura Latam",
        footText: "Septiembre 2023",
        href: "https://app.aluracursos.com/program/certificate/d6263e57-185f-46d9-ab4b-f2fce591c67e"
    },
]

export const projects: ProjectCardProps[] = [
    {
        image: "/images/usales.jpg",
        title: "Usales",
        description: "Usales es una aplicación web en desarrollo diseñada para simplificar la gestión de restaurantes, permitiendo el registro de ventas, el control de inventario y la administración de gastos de manera intuitiva y eficiente.",
        skills: ["Next.js", "CSS", "Styled-Components", "MySQL"],
        href: "/projects/usales"
    },
    {
        image: "/images/uwork.jpg",
        title: "Uwork",
        description: "Uwork es una aplicación web diseñada para facilitar la búsqueda de empleo, conectando a las personas con oportunidades laborales que se ajusten a sus habilidades, competencias y necesidades.",
        skills: ["React", "Material UI", "CSS", "MySQL", "SpringBoot"],
        href: "/projects/uwork"
    },
    {
        image: "/images/uplan.jpg",
        title: "Uplan",
        description: "Uplan es una aplicación móvil nativa para Android diseñada para ayudar a los estudiantes de la Universidad Nacional Autónoma de Honduras (UNAH) a planificar sus clases y gestionar su carga académica de manera eficiente.",
        skills: ["Kotlin", "XML"],
        href: "/projects/uplan"
    },
    {
        image: "/images/lightdriving.jpg",
        title: "LightDriving",
        description: "LightDriving es una aplicación web diseñada para ofrecer servicios de transporte privado de manera rápida, segura y accesible. La aplicación permite a los usuarios localizar los taxis más cercanos, agilizando el tiempo de recogida y garantizando un servicio confiable.",
        skills: ["Laravel", "HTML", "CSS", "Javascript", "Springboot"],
        href: "/projects/lightdriving"
    },
    {
        image: "/images/spotifyreplica.jpg",
        title: "Spotify (Replica)",
        description: "Este proyecto es una réplica de la aplicación web de Spotify, enfocada en simular la experiencia de un servicio de streaming musical. Aunque no reproduce música, permite a los usuarios explorar información detallada sobre artistas, álbumes y podcasts, así como crear y gestionar playlists personalizadas.",
        skills: ["Laravel", "HTML", "CSS", "Javascript", "Springboot", "MySQL"],
        href: "/projects/spotify-replica"
    },
    {
        image: "/images/biblioteca-fisica.jpg",
        title: "Biblioteca de Física",
        description: "La Biblioteca de Física es una aplicación y sitio web diseñada para los estudiantes de la carrera de Física de la Universidad Nacional Autónoma de Honduras (UNAH). Esta plataforma permite a los estudiantes visualizar los libros disponibles en la biblioteca de la carrera, gestionar un perfil personal y reservar libros para su recogida posterior.",
        skills: ["React", "HTML", "CSS", "Styled-Components"],
        href: "/projects/biblioteca-fisica"
    },
    {
        image: "/images/registro-unah-replica.jpg",
        title: "Registro UNAH (Réplica)",
        description: "Este proyecto es una réplica de un sistema de gestión universitaria, inspirado en los procesos de la Universidad Nacional Autónoma de Honduras (UNAH). La aplicación web maneja procesos clave como la admisión y matrícula de estudiantes, además de incluir portales para personal administrativo, como administradores de admisiones, maestros, jefes de departamento y coordinadores.",
        skills: ["Javascript", "HTML", "CSS", "PHP"],
        href: "/projects/registro-unah-replica"
    },
]

