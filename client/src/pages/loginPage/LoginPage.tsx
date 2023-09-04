import "./loginPage.css"
import { SiThemoviedatabase } from 'react-icons/si';

export const LoginPage = () => {
    // const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        console.log("Loggin button");
    };
    return (
        <div className="login-container">
            <SiThemoviedatabase className="moviehub-logo" />
            <button className="login-btn" onClick={handleLogin}>Log In</button>
        </div>
    )
}
