import ChangeLanguage from "../../components/change-language.jsx";
import ChangeTheme from "../../components/change.theme.jsx";
import {useAppContext} from "../../contexts/app/app-context.jsx";

const TopNavbar = () => {

    const {showSidebar, toggleSidebar} = useAppContext();

    return (
        <nav className="navbar">
            <a href="#" className="sidebar-toggle" onClick={() => toggleSidebar(!showSidebar)}>
                <i className="hamburger align-self-center "></i>
            </a>
            <div className="d-flex  align-items-center gap-3 ms-auto">
                <ChangeLanguage/>
                <ChangeTheme/>
            </div>
        </nav>
    )
}

export default TopNavbar;