import type {SocialItemProps, ContentBlockProps, ButtonLinksProps, Skills, AcademicCardProps, ProjectCard, HeaderItems} from '../../interfaces/interface.ts'

export const headerItems: HeaderItems[] = [
    {text:"Inicio", href:"/"},
    {text:"Habilidades", href:"/skills"},
    {text:"Proyectos", href:"/projects"}
]

export const socials: SocialItemProps[] = [
    {
        icon: "/images/github-icon.svg",
        url: "https://github.com/dan8a112"
    },
    {
        icon: "/images/linkedin-icon.svg",
        url: "https://www.linkedin.com/in/daniel-ochoa-is/"
    }
]

export const contentBlocks: ContentBlockProps[] = [
    {
        title: "Trayectoria profesional",
        paragraph: "A lo largo de mi formación, he tenido la oportunidad de participar en diversos proyectos como <strong>desarrollador web</strong>, tanto en el área de <strong>frontend</strong> (diseño y programación de interfaces de usuario) como en <strong>backend</strong> (desarrollo de APIs web). Estas experiencias me han permitido fortalecer mis habilidades técnicas, así como mi capacidad para <strong>trabajar en equipo</strong> y adaptarme a diferentes entornos de desarrollo.",
        image: "/images/programming-ill.png",
        imageAlt: "Programacion ilustracion",
        imageRight: true
    },
    {
        title: "Ciencia y Libros",
        paragraph: "Además de mi pasión por la programación, soy un entusiasta de la <strong>ciencia y la literatura</strong>. Disfruto de un buen café mientras leo libros que van desde <strong>fantasía y ciencia ficción hasta temas científicos </strong>que exploran los misterios del universo. Para mí, la lectura no solo es una fuente de inspiración, sino también una forma de relajarme y mantener mi mente activa.",
        image: "/images/books-ill.png",
        imageAlt: "Ciencia y libros ilustracion",
        imageRight: false
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
    Frontend: [
        {
            icon: "/images/javascript-icon.png",
            text: "Javascript",
            percentage: 0.5,
            endText: "50%"
        },
        {
            icon: "/images/react-icon.png",
            text: "React",
            percentage: 0.3,
            endText: "30%"
        },
        {
            icon: "/images/nextjs-icon.png",
            text: "Next.js",
            percentage: 0.25,
            endText: "25%"
        },
        {
            icon: "/images/astrojs-icon.png",
            text: "Astro.js",
            percentage: 0.2,
            endText: "20%" 
        },
        {
            icon: "/images/bootstrap-icon.png",
            text: "Bootstrap",
            percentage: 0.4,
            endText: "40%"
        }
    ],
    Backend: [
        {
            icon: "/images/springboot-icon.png",
            text: "SpringBoot",
            percentage: 0.3,
            endText: "30%"
        },
        {
            icon: "/images/phg-icon.png",
            text: "PHP",
            percentage: 0.2,
            endText: "20%"
        },
        {
            icon: "/images/laravel-icon.png",
            text: "Laravel",
            percentage: 0.2,
            endText: "20%"
        }
    ],
    "Data Bases": [
        {
            icon: "/images/mysql-icon.png",
            text: "MySQL",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/oracle-icon.png",
            text: "Oracle",
            percentage: 0.3,
            endText: "30%"
        }
    ],
    "Diseño": [
        {
            icon: "/images/figma-icon.png",
            text: "Figma",
            percentage: 0.4,
            endText: "40%"
        },
        {
            icon: "/images/illustrator-icon.png",
            text: "Adobe Illustrator",
            percentage: 0.25, 
            endText: "25%"
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
        image: "/images/unah-logo.png",
        title: "Universidad Nacional Autónoma de Honduras",
        subtitle: "Ingeniería en Sistemas",
        footTitle: "2020 - Actualidad"
    },
    {
        image: "/images/alura-logo.png",
        title: "Oracle Next Education & Alura Latam",
        subtitle: "Formación FrontEnd",
        footTitle: "30 Mar. 2023 - 22 Sep. 2023"
    },
    {
        image: "/images/cisco-logo.png",
        title: "Cisco Networking Academy",
        subtitle: "CCNA1 Network Funtamentals",
        footTitle: "10 Jun. 2024 - 20 Dic. 2024"
    },
]

export const projects: ProjectCard[] = [
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

