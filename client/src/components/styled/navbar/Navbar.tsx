import { BiHomeAlt2, BiLogOut } from 'react-icons/bi'
import { MdLibraryAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { useLocation } from "react-router-dom";
import "./navbar.css"
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname.slice(1);
    // const location = useLocation().pathname.split("/")[1];
    const { logout } = useAuth0();


    const handleIconsClicked = (path: string) => {

        switch (path) {
            case 'moviehub': navigate('/moviehub');
                break
            case 'addMovie': navigate('addMovie');
                break
            case 'profile': navigate('profile')
                break
            case '/': logout();
                break

        }
    }

    const navbarPaths = ["moviehub", "addMovie", "profile", "/"]

    useEffect(() => {
        let newLocation = location;
        if (location[location.length - 1] === "/") {
            newLocation = location.slice(0, -1);
        }
        if (newLocation.includes("addMovie") || newLocation.includes("profile")) {
            newLocation = newLocation.split("/")[1];
        }
        const button = document.querySelector(`#${newLocation}`) as HTMLInputElement;
        if (button) button.checked = true;

    }, [location])

    return (
        <nav className="navbar-bottom-container">
            {navbarPaths.map((path, index) => (
                <div className="icon-navbar-container" key={index}>
                    <input id={path} name="icon-navbar-bottom" type="radio" className="input-navbar-bottom" />
                    <label htmlFor="path" className="label-navbar-bottom">
                        {index === 0 && <BiHomeAlt2 className="icons-navbar" onClick={() => handleIconsClicked(path)} />}
                        {index === 1 && <MdLibraryAdd className="icons-navbar" onClick={() => handleIconsClicked(path)} />}
                        {index === 2 && <RiAccountPinCircleLine className="icons-navbar" onClick={() => handleIconsClicked(path)} />}
                        {index === 3 && <BiLogOut className="icons-navbar" onClick={() => handleIconsClicked(path)} />}
                    </label>
                </div>
            ))}
        </nav>
    )
}
