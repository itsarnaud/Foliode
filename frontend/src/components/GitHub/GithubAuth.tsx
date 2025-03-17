"use client";

import { signInGitHub } from "@/actions";
import Buttons from "@/components/UI/button";
import { FaGithub } from "react-icons/fa";

export default function SignIn({ disable = false }) {
  return (
    <form action={signInGitHub} className="w-full">
      <Buttons 
        text="GitHub"
        style="form"
        icon={<FaGithub />}
        type="submit"
        isDisabled={disable}
      />
    </form>
  );
}