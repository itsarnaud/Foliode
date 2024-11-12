"use client";

import { signInGitHub } from "@/actions";

export default function SignIn() {
  return (
    <div>
      <form action={signInGitHub}>
        <button type="submit">Signin with GitHub</button>
      </form>
    </div>
  );
}