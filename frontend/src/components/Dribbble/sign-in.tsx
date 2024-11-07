"use client";

import { useSession }     from "next-auth/react";
import { signInDribbble } from "@/actions";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <h1>Connecté en tant que {session.user?.name}</h1>
      ) : (
        <form action={signInDribbble}>
          <button type="submit">Signin with Dribbble</button>
        </form>
      )}
    </div>
  );
}