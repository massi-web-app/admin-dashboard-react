import ChangeLanguage from "../../components/change-language.jsx";
import ChangeTheme from "../../components/change.theme.jsx";
import {useAppContext} from "../../contexts/app/app-context.jsx";
import {useNavigate} from "react-router-dom";

const TopNavbar = () => {

    const {showSidebar, toggleSidebar} = useAppContext();
    const {language} = useAppContext();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }
    return (
        <nav className="navbar">
            <a href="#" className="sidebar-toggle" onClick={() => toggleSidebar(!showSidebar)}>
                <i className="hamburger align-self-center "></i>
            </a>
            <div className="d-flex  align-items-center gap-3">
                <ChangeLanguage/>
                <ChangeTheme/>
            </div>
            <div className={`${language === "fa" ? "me-auto" : "ms-auto"}`}>
                <button className="btn ms-2 btn-outline-danger fw-bolder" onClick={logout}>
                    خارج شوید
                </button>
            </div>
        </nav>
    )
}

export default TopNavbar;