import "./loginPage.css"
import { SiThemoviedatabase } from 'react-icons/si';
import { useAuth0 } from "@auth0/auth0-react";

export const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();


    return (
        <div className="login-container">
            <SiThemoviedatabase className="moviehub-logo" />
            <button className="login-btn" onClick={() => loginWithRedirect()}>Log In</button>
        </div>
    )
}
