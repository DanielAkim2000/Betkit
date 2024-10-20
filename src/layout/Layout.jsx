import { Outlet } from "react-router-dom";
import { Footer, Header } from "./index";

const Layout = () => {
    return (
        <div className="body w-full">
            <Header />
            <main className="py-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export { Layout };
