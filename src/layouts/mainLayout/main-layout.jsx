import {useState} from "react";
import ChangeTheme from "../../components/change.theme.jsx";
import ChangeLanguage from "../../components/change-language.jsx";
import logo from '@assets/images/logo-96804ef9.svg'
import {Outlet} from "react-router-dom";
import Sidebar from "./sidebar.jsx";
import TopNavbar from "./top-navbar.jsx";
import Footer from "./footer.jsx";

const MainLayout = () => {

    const [collapseSidebar, setCollapseSidebar] = useState(false);


    return (
        <div className="wrapper" style={{minHeight: '100vh'}}>
            <Sidebar/>
            <div className="main">
                <TopNavbar/>
                <main className="content">

                    <div className="container-fluid p-0">
                        <Outlet/>
                    </div>
                </main>
                <Footer/>
            </div>
            {/*<Outlet/>*/}
        </div>
    )
}

export default MainLayout;