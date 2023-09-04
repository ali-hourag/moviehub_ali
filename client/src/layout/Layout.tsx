import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Navbar } from "../components/styled/navbar/Navbar"
import "./layout.css"
import { Header } from "../components/styled/header/Header"


export const Layout: FC = () => {
    return (
        <div className="moviehub-container">
            <Header />
            <Outlet />
            <Navbar />
        </div>
    )
}
