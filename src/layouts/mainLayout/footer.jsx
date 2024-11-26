import {useTranslation} from "react-i18next";

const Footer = () => {

    const {t}=useTranslation();

    return (
        <footer className="footer">
            Developed By {t('developed_by')}
        </footer>
    )
}

export default Footer;