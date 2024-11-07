"use client";

import { useSession } from "next-auth/react";
import { signInGitHub } from "@/actions";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <h1>Connecté en tant que {session.user?.name}</h1>
      ) : (
        <form action={signInGitHub}>
          <button type="submit">Signin with GitHub</button>
        </form>
      )}
    </div>
  );
}