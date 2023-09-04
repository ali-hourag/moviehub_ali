import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/non-styled/PrivateRoute';
import { LoginPage } from '../pages/loginPage/LoginPage';
import { HomePage } from '../pages/homePage/HomePage';
import { AddMovie } from '../pages/addMoviePage/AddMovie';
import { ProfilePage } from '../pages/profilePage/ProfilePage';


export const RouterPaths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="" element={<PrivateRoute />}>
                        <Route path="home" element={<HomePage />} />
                        <Route path="addMovie" element={<AddMovie />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
