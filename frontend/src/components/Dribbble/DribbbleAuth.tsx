"use client";

import { signInDribbble } from "@/actions";

export default function SignIn() {

  return (
    <div>
      <form action={signInDribbble}>
        <button type="submit">Signin with Dribbble</button>
      </form>
    </div>
  );
}