"use client";

import { signInGitHub } from "@/actions";
import Buttons from "@/components/UI/button";
import { FaGithub } from "react-icons/fa";

export default function SignIn() {
  return (
    <form action={signInGitHub} className="w-full">
      <Buttons 
        text="GitHub"
        style="form"
        icon={<FaGithub />}
        type="submit"
      />
    </form>
  );
}