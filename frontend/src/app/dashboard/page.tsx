'use client';

import DashboardTitle from '@/components/DashboardTitle';
import {useUserStore} from "@/store/user.store";
import {useEffect} from 'react';

import {signInGitHub, signInDribbble} from '@/actions';
import {Colors as ColorsInterface} from '@/interfaces/Colors';
import {Promotion} from '@/interfaces/Promotion';

import {usePortfolioStore} from '@/store/portfolio.store';
import {Card, CardBody, Link} from '@heroui/react';

import {
    FaGithub,
    FaDribbble,
    FaGraduationCap,
    FaPencilAlt
} from 'react-icons/fa';
import {CiDatabase} from 'react-icons/ci';


export default function Dashboard() {
    const {user, fetchFromJwt} = useUserStore();
    const {fetchPortfolio, portfolio} = usePortfolioStore();
    const projects = portfolio?.projects || [];
    const portfolioColors = portfolio?.config.colors;
    const portfolioPromotion = portfolio?.users.promotion as Promotion;

    useEffect(() => {
        fetchFromJwt()
        fetchPortfolio()
    }, []);

    return (
        <>
            <DashboardTitle title="Tableau de bord"/>

            <div className="h-screen w-full p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <div className="sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col gap-4">
                        <Card
                            className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                            <CardBody className="flex flex-row items-center gap-5 p-4">
                                <FaGithub className="text-2xl"/>
                                {user?.github_login ?
                                    <span className="dayMode">Connecté en tant que <Link
                                        href={`https://github.com/${user.github_login}`} underline="hover" isExternal
                                        className="cursor-pointer">{user?.github_login}</Link></span>
                                    :
                                    <>
                                        <Link onPress={() => signInGitHub()} isExternal showAnchorIcon underline="hover"
                                              className="text-foreground cursor-pointer">
                                            Connectez-vous avec GitHub
                                        </Link>
                                    </>
                                }
                            </CardBody>
                        </Card>

                        <Card
                            className="w-full overflow-hidden shadow-lg hover:shadow-xl duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                            <CardBody className="flex flex-row items-center gap-5 p-4">
                                <FaDribbble className="text-2xl"/>
                                {user?.dribbble_login ?
                                    <span className="dayMode">Connecté en tant que <Link
                                        href={`https://dribbble.com/${user.dribbble_login}`} underline="hover"
                                        isExternal className="cursor-pointer">{user?.dribbble_login}</Link></span>
                                    :
                                    <>
                                        <Link onPress={() => signInDribbble()} isExternal showAnchorIcon
                                              underline="hover" className="text-foreground cursor-pointer">
                                            Connectez-vous avec Dribbble
                                        </Link>
                                    </>
                                }
                            </CardBody>
                        </Card>
                    </div>

                    <Card
                        className="sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 shadow-lg hover:shadow-xl duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                        <CardBody>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">{portfolio?.title || "Votre portfolio"}</h2>
                                <Link href="/dashboard/edit" className="">
                                    <FaPencilAlt
                                        className="dayMode text-primary duration-200 hover:text-primary-200 hover:scale-110"/>
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="">Nombre de projets: {projects.length}</p>
                                <p className="">Template: {portfolio?.template || "Non défini"}</p>
                                <p className="">URL: {portfolio?.url ? `/${portfolio.url}` : "Non définie"}</p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card
                        className="sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-2 shadow-lg hover:shadow-xl duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                        <CardBody>
                            <div className="flex items-center gap-3 mb-3">
                                <FaGraduationCap className="text-2xl"/>
                                <h2 className="text-xl font-bold">Formation</h2>
                            </div>
                            {portfolioPromotion ? (
                                <div className="space-y-2">
                                    <p><span className="font-semibold">Type:</span> {portfolioPromotion.formation.type}
                                    </p>
                                    <p><span
                                        className="font-semibold">Formation:</span> {portfolioPromotion.formation.name}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">Aucune formation associée</p>
                            )}
                        </CardBody>
                    </Card>

                    <Card
                        className="sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-2 shadow-lg hover:shadow-xl duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                        <CardBody>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Compétences</h2>
                                <Link href="/dashboard/skills"
                                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                                    <FaPencilAlt
                                        className="dayMode text-primary duration-200 hover:text-primary-200 hover:scale-110"/>
                                </Link>
                            </div>
                            {portfolio?.tools && portfolio.tools.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {portfolio.tools.map((tool, index) => (
                                        <div key={index}
                                             className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                                            {tool.name}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">Aucune compétence définie</p>
                            )}
                        </CardBody>
                    </Card>

                    <Card
                        className="sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-3 shadow-lg hover:shadow-xl duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                        <CardBody>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Projets récents</h2>
                                <Link href="/dashboard/projects"
                                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                                    <FaPencilAlt
                                        className="dayMode text-primary duration-200 hover:text-primary-200 hover:scale-110"/>
                                </Link>
                            </div>
                            {projects.length > 0 ? (
                                <div className="space-y-3">
                                    {projects.slice(0, 3).map((project, index) => (
                                        <div key={index} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                            <h3 className="font-semibold">{project.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
                                        </div>
                                    ))}
                                    {projects.length > 3 && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">+ {projects.length - 3} autres
                                            projets</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">Aucun projet</p>
                            )}
                        </CardBody>
                    </Card>

                    <Card
                        className="sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-2 shadow-lg hover:shadow-xl duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                        <CardBody>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Couleurs du portfolio</h2>
                                <Link href="/dashboard/edit"
                                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                                    <FaPencilAlt
                                        className="dayMode text-primary duration-200 hover:text-primary-200 hover:scale-110"/>
                                </Link>
                            </div>
                            {portfolioColors ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.keys(portfolioColors).map((colorKey) => (
                                        <div key={colorKey} className="flex items-center gap-2">
                                            <div
                                                className="w-6 h-6 rounded-full border border-gray-300"
                                                style={{backgroundColor: portfolioColors[colorKey as keyof ColorsInterface]}}
                                            ></div>
                                            <span className="capitalize">{colorKey}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">Aucune couleur définie</p>
                            )}
                        </CardBody>
                    </Card>

                    <Card
                        className="sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-3 shadow-lg hover:shadow-xl duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                        <CardBody>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Typographie</h2>
                                <Link href="/dashboard/edit"
                                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                                    <FaPencilAlt
                                        className="dayMode text-primary duration-200 hover:text-primary-200 hover:scale-110"/>
                                </Link>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Titre (H1)</h3>
                                    <p className="text-2xl font-bold">Exemple de titre</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Sous-titre (H2)</h3>
                                    <p className="text-xl font-semibold">Exemple de sous-titre</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Texte</h3>
                                    <p>Exemple de texte standard.</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card
                        className="col-span-full shadow-lg hover:shadow-xl duration-300 border-2 border-gray-200 dark:border-[#2C2D33]">
                        <CardBody>
                            <div className="flex items-center gap-3 mb-4">
                                <CiDatabase className="text-2xl"/>
                                <h2 className="text-xl font-bold">Analytiques du Portfolio</h2>
                            </div>
                            <div
                                className="h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    Visualisation des analytiques à venir...<br/>
                                    <span
                                        className="text-sm">Suivez les vues et l&apos;engagement de votre portfolio !</span>
                                </p>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">--</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Vues Totales</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">--</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Cette Semaine</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">--</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Temps Moyen</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}