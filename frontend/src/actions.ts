"use server";

import { signIn } from "@/auth";

export async function signInGitHub() {
  await signIn("github")
}

export async function signInDribbble() {
  await signIn("dribbble");
}

