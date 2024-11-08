"use client";

import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getSession();
      if (session?.accessToken) {
        const response = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          data.accessToken = session?.accessToken;
          console.log(data);
          setUserData(data);
        } else {
          console.error("Failed to fetch user data from GitHub");
        }
      }
    };
    fetchUserData();
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Information</h1>
      <Image src={userData.avatar_url} alt="user_pfp" width={100} height={100} />
      <p><strong>ID:</strong> {userData.id}</p>
      <p><strong>Username:</strong> {userData.login}</p>
      <p><strong>Bio:</strong> {userData.bio}</p>
      <p><strong>Location:</strong> {userData.location}</p>
      <p><strong>Public Repos:</strong> {userData.public_repos}</p>
      <p><strong>Access token:</strong> {userData.accessToken}</p>
    </div>
  );
}
