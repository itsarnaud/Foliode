'use client'

import React, {useState, useEffect} from 'react'
import {getDecodedToken} from '@/utils/jwtUtils'
import {Repository} from '@/interfaces/Repository'
import {Card, CardHeader, Divider, CardBody} from '@nextui-org/react'
import {githubApiGetRepos} from '@/utils/apiRequester'
import Buttons from "@/components/UI/button";
import ExertnalProjectForm from "@/components/form/ExternalProjectForm";

const GithubRepos = () => {
    const token = getDecodedToken();
    const [repos, setRepos] = useState<Repository[]>([])
    const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    useEffect(() => {
        const fetchRepos = async () => {
            if (token && token.github_login) {
                const response = await githubApiGetRepos(token.github_login)
                if (response) {
                    setRepos(response)
                }
            }
        }
        fetchRepos();
    }, [token]);

    const openForm = (repo: Repository) => {
        setSelectedRepo(repo);
        setIsFormOpen(true);
    }

    return (
        <>
            {repos.length > 0 && (
                <div className="nightMode container mx-auto px-4 py-8 border-2 border-primary border-dashed rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, index) => (
                            <Card key={index}
                                  className="bg-foreground text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="flex gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-lg font-semibold">{repo.name}</p>
                                        <p className="text-sm text-gray-400">{repo.owner.login}</p>
                                    </div>
                                </CardHeader>
                                <Divider className="bg-gray-700"/>
                                <CardBody>
                                    <p className="text-gray-300 mb-4">{repo.description}</p>
                                    <div className='flex justify-between items-center'>
                                        <a
                                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Voir le repo
                                        </a>
                                        <Buttons
                                            text="Ajouter"
                                            style='form'
                                            className="bg-primary w-auto"
                                            onClick={() => openForm(repo)}
                                        />
                                    </div>

                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
            {isFormOpen && selectedRepo && (
                < ExertnalProjectForm title={selectedRepo.name} description={selectedRepo.description}
                                      links={[selectedRepo.html_url]} owner={selectedRepo.owner.login}
                                      githubId={selectedRepo.id}/>
            )}
        </>

    );
}


export default GithubRepos;