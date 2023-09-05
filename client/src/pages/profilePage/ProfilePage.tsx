import "./profilePage.css"

export const ProfilePage = () => {
    return (
        <div className="profile-container">
            <div className="profile-img-container">
                <img src="" className="profile-img" />
            </div>
            <p className="profile-name_p">ALI HOURAG</p>
            <p className="profile-email_p">ali.hourag@gmail.com</p>
            <button className="remove-account_btn">REMOVE ACCOUNT</button>
        </div>
    )
}
