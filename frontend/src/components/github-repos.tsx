'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export default function GithubRepos() {

  const { data: session } = useSession(); // Récupère la session
  const [repos, setRepos] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRepos = async (accessToken: string) => {
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const repos = await response.json();
      return repos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    if (session?.accessToken) {
      fetchRepos(session.accessToken)
        .then((reposData) => {
          setRepos(reposData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error in fetchRepos:", error);
          setRepos([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading) return <p>Chargement des repositories...</p>;

  if (!session) return <p>Connectez vous pour voir vos repository</p>

  return (
    <div>
      <h1>Mes Repositories GitHub</h1>
      {repos.length > 0 ? (
        <ul>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {repos.map((repo: any) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <p>{repo.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun repository trouvé.</p>
      )}
    </div>
  );

};

