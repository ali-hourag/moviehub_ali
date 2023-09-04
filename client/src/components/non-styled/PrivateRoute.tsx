// import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

import { Outlet } from "react-router-dom"

// export const PrivateRoute = () => {

//     const { isAuthenticated } = useAuth0();

//     return (
//         isAuthenticated ?
//             <Outlet /> : <Navigate to='/login' />
//     )

// }


export const PrivateRoute = () => {
    return (
        <>
            <Outlet />
        </>
    )
}


