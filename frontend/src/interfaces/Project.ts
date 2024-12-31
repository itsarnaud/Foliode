export interface Project {
    title: string
    description: string
    links: string[]
    images: File[]
    projectsImages: {img_src: string,  img_alt: string}[] | null
}
