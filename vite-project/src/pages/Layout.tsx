import { Outlet } from "react-router-dom";
import { Header } from "../component/header";

export function Layout() {
    return (
        <div className="bg-bg pr-pd-s pl-pd-s md:pr-pd-lg md:pl-pd-lg">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}