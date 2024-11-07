"use client";

import { useSession } from "next-auth/react";
import { signInWithGitHub } from "@/actions";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <p>Connecté en tant que {session.user?.name}</p>
      ) : (
        <form action={signInWithGitHub}>
          <button type="submit">Signin with GitHub</button>
        </form>
      )}
    </div>
  );
}