import usaFlag from '../assets/images/en.jpg'
import irFlag from '../assets/images/fa.png'
import {useEffect, useRef, useState} from "react";

const ChangeLanguage = () => {

    const [show, setShow] = useState(false);
    const ref = useRef();

    useEffect(() => {

        const checkIfClickOutside = (e) => {
            console.log(show,ref.current,!ref.current.contains(e.target));
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside);
        }

    }, [show]);

    return (
        <div className="dropdown">
            <a href="#" className={"nav-flag dropdown-toggle"} onClick={() => setShow(!show)}>
                <img src={usaFlag} alt="English"/>
            </a>
            <div ref={ref} className={`dropdown-menu dropdown-menu-end ${show ? 'show' : ''}`}>
                <a href="#" className={"dropdown-item fw-bolder"} style={{textAlign: "right"}}>
                    <img src={irFlag} width={20} className="ms-2" alt="Farsi"/>
                    <span className="align-middle">فارسی</span>
                </a>

                <a href="#" className={"dropdown-item fw-bolder"} style={{textAlign: "right"}}>
                    <img src={usaFlag} width={20} className="ms-2" alt="Farsi"/>
                    <span className="align-middle">English</span>
                </a>
            </div>

        </div>
    )
}

export default ChangeLanguage;