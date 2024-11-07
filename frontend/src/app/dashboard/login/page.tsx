import SignInGithub     from "@/components/GitHub/sign-in";
import SignInDribbble   from "@/components/Dribbble/sign-in";
import SignOut          from "@/components/sign-out";

import '@/scss/login.scss'

export default function LoginPage() {
    return (
        <div className="login-wrapper">
            <div className="login-element">
                <h1>Github :</h1>
                <SignInGithub />
            </div>

            <div className="login-element">
                <h1>Dribbble :</h1>
                <SignInDribbble />
            </div>

            <div className="login-element">
                <h1>Se déconnecter de tout :</h1>
                <SignOut />
            </div>
        </div>
    )
}