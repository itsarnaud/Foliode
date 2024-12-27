import {Project} from "@/interfaces/Project";

export const formatProjectsData = (projects: Project[]) => {
    const projectsFormData = new FormData()

    projects.forEach((project, index) => {
        projectsFormData.append(`projects[${index}][title]`, project.title)
        projectsFormData.append(`projects[${index}][description]`, project.description)
        project.links.forEach((link, linkIndex) => {
            projectsFormData.append(`projects[${index}][links][${linkIndex}]`, link)
        })
        project.images.forEach((image, imageIndex) => {
            projectsFormData.append(`projects[${index}][images][${imageIndex}]`, image)
        })
    })

    return projectsFormData
}

export const formatToolsData = (tools: any[]) => {
    const toolsFormData = new FormData()

    tools.forEach((tool, index) => {
        toolsFormData.append(`tools[${index}][name]`, tool.name)
        if (tool.image) {
            toolsFormData.append(`tools[${index}][image]`, tool.image)
        }
    })

    return toolsFormData
}