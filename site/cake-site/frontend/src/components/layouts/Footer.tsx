import facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";
import whatsapp from "../../assets/icons/whatsapp.png";

const Footer: React.FC = () => {

    return (
        <footer className="bg-blueCustom w-full fixed bottom-0 p-2 h-34">
            <div className="grid grid-cols-2 items-center h-full">
                <div>
                    <p className="font-bold">Site name or LOGO</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="font-bold mb-2">Contact Us</p>
                    <ul className="flex flex-col items-start space-y-2">
                        <li>
                            <a href="https://www.facebook.com/decor_artballons/" target="_blank" rel="noopener noreferrer">
                                <img src={facebook} alt="Facebook" className="w-6 h-6" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/decor_artballons/" target="_blank" rel="noopener noreferrer">
                                <img src={instagram} alt="Instagram" className="w-6 h-6" />
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/tonnumero" target="_blank" rel="noopener noreferrer">
                                <img src={whatsapp} alt="Whatsapp" className="w-6 h-6" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
};

export default Footer;