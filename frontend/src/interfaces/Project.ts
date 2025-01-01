export interface Project {
    title: string
    description: string
    links: string[]
    images: File[]
    start_date: null | string
    end_date: null | string 
    projectsImages: {img_src: string,  img_alt: string}[] | null
}