import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <section id="footer" >
                <div className="bg-gray-500 px-6 flex flex-col justify-between items-center space-y-6">

                    <div className="w-full flex flex-col sm:flex-row items-center justify-center space-y-2 font-semibold text-gray-200">
                        <span className="py-12 px-6 flex flex-col justify-between items-center space-y-6">
                            <Link to="/Imprint" >Imprint</Link>
                        </span>
                        <span className="py-12 px-6 flex flex-col justify-between items-center space-y-6">
                            <Link to="/GDPR" >GDPR</Link>
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;