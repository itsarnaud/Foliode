'use client'

import { useEffect, useState } from 'react'
import { Input, Textarea } from "@nextui-org/react"
import LinkInput from "@/components/UI/LinkInput"
import Buttons from "@/components/UI/button"
import { apiPost, githubApiGetReadme } from "@/utils/apiRequester"
import { extractImageFromReadme } from "@/utils/regexUtils"
import Image from "next/image";

interface ExternalProjectFormProps {
    owner: string
    title: string
    description: string | null
    links: string[]
    githubId: number
}

interface Project {
    title: string
    description: string | null
    links: string[]
    images: string[]
    githubId: number
}

function ExternalProjectForm({ owner, title, description, links, githubId }: ExternalProjectFormProps) {
    const [project, setProject] = useState<Project>({
        title: title,
        description: description,
        links: links,
        images: [],
        githubId: githubId
    })

    useEffect(() => {
        const fetchReadme = async () => {
            const readme = await githubApiGetReadme(owner, title)
            if (readme) {
                const imageUrls = extractImageFromReadme(readme, owner, title)
                setProject({ ...project, images: imageUrls })
            } else {
                console.log('Aucun README trouvé.')
            }
        }
        fetchReadme()
    }, [])

    const createProject = async () => {
        try {
            await apiPost('project', project, 'application/json')
        } catch (error) {
            console.log("Erreur lors de la création du projet :", error)
        }
    }

    const inputStyles = {
        input: "px-2 py-1 text-gray-400 bg-foreground",
        inputWrapper: "bg-transparent border-2 border-gray-500 hover:border-gray-300 focus:border-primary rounded-md transition-all duration-300 ease-in-out"
    }

    return (
        <div className="nightMode rounded-md p-5 flex flex-col transition-all duration-300 ease-in-out fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="flex flex-col gap-4 h-full">
                <div className="grid grid-cols-6 gap-1 mb-4">
                    {project.images.map((image, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-md">
                            <Image
                                src={image}
                                alt={`project-${index}`}
                                className="w-full h-full object-cover"
                                width={150} height={150}
                            />
                        </div>
                    ))}
                </div>
                <div className="space-y-4 flex-grow flex flex-col">
                    <Input
                        type="text"
                        placeholder="Titre du projet"
                        onChange={(e) => setProject({...project, title: e.target.value})}
                        name="title"
                        classNames={inputStyles}
                        value={project.title}
                        variant="bordered"
                        className="flex-grow"
                    />
                    <Textarea
                        placeholder="Description du projet"
                        name="content"
                        onChange={(e) => setProject({...project, description: e.target.value})}
                        classNames={inputStyles}
                        value={project.description ? project.description : ''}
                        variant="bordered"
                        minRows={10}
                        maxRows={20}
                        className="flex-grow"
                    />
                    <LinkInput
                        placeholder="Liens vers le projet"
                        name="link"
                        onChange={value => setProject({...project, links: value})}
                        value={project.links}
                    />
                    <div className="flex justify-start mt-5">
                        <Buttons
                            text="Créer un projet"
                            style='form'
                            className="bg-primary w-auto"
                            onClick={createProject}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExternalProjectForm

