import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../../utils/hooks/useUserContext"
import "./profilePage.css"
import { deleteUser } from "../../api/fetchApi";

export const ProfilePage = () => {
    const { currentUser } = useUserContext();
    const { user, logout } = useAuth0();
    const { getAccessTokenSilently } = useAuth0();
    const removeAccountClicked = async () => {
        // delete account
        if (user?.email) await deleteUser(getAccessTokenSilently, user?.email)
        logout();
    }
    return (
        <div className="profile-container">
            <div className="profile-img-container">
                <img src={user?.picture} className="profile-img" />
            </div>
            <p className="profile-name_p">{currentUser?.name}</p>
            <p className="profile-email_p">{currentUser?.email}</p>
            <button className="remove-account_btn" onClick={removeAccountClicked}>REMOVE ACCOUNT</button>
        </div>
    )
}
