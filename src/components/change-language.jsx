import usaFlag from '../assets/images/en.jpg'
import irFlag from '../assets/images/fa.png'
import {useEffect, useRef, useState} from "react";
import {useAppContext} from "../contexts/app/app-context.jsx";

const ChangeLanguage = () => {

    const [show, setShow] = useState(false);
    const ref = useRef();
    const {language, changeLanguage} = useAppContext();

    useEffect(() => {

        const checkIfClickOutside = (e) => {
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside);
        }

    }, [show]);

    const handleChangeLanguage=(language)=>{
        changeLanguage(language);
        setShow(false);

    }


    return (
        <div className="dropdown">
            <a href="#" className={"nav-flag dropdown-toggle"} onClick={() => setShow(!show)}>
                <img src={language === "fa" ? irFlag : usaFlag} alt="English"/>
            </a>
            <div ref={ref} className={`dropdown-menu dropdown-menu-end ${show ? 'show' : ''}`}>
                <a href="#" className={"dropdown-item fw-bolder d-flex align-items-center gap-2"} style={{textAlign: language==="fa" ?  "right" : "left"}}
                   onClick={() => handleChangeLanguage("fa")}>
                    <img src={irFlag} width={20} className="ms-2" alt="Farsi"/>
                    <span className="align-middle">فارسی</span>
                </a>

                <a href="#" className={"dropdown-item fw-bolder d-flex align-items-center gap-2"} style={{textAlign: language==="fa" ?  "right" : "left"}}
                   onClick={() => handleChangeLanguage("en")}>
                    <img src={usaFlag} width={20} className="ms-2" alt="Farsi"/>
                    <span className="align-middle">English</span>
                </a>
            </div>
        </div>

    )
}

export default ChangeLanguage;