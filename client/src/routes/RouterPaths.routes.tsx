import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/loginPage/LoginPage';
import { HomePage } from '../pages/homePage/HomePage';
import { AddMovie } from '../pages/addMoviePage/AddMovie';
import { ProfilePage } from '../pages/profilePage/ProfilePage';
import { Layout } from '../layout/Layout';


export const RouterPaths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route path="/moviehub" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="addMovie" element={<AddMovie />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}
