export interface LinkItems{
    text: string;
    href: string;
}

export interface SocialLinkProps{
    icon: string;
    url: string;
    height: string;
    width: string;
    altText: string;
}

export interface ContentBlockProps{
    title: string;
    paragraph: string;
    image: string;
    imageAlt: string;
    imageRight: boolean;
}

export interface ButtonLinksProps{
    text: string;
    href: string; 
}

export interface SkillItem{
    icon?: string;
    text: string;
    percentage: number;
    endText: string;
}

export interface Skills{
    [category: string]: SkillItem[];
}

export interface AcademicCardProps{
    image: string;
    title: string;
    subtitle: string;
    footText: string;
}

export interface ProjectCardProps{
    image: string;
    title: string;
    description: string;
    skills: string[];
    href: string;
}
