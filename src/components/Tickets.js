import { Link } from "react-router-dom";

function Tickets() {
    return (
        <>
            <section id="tickets" className="bg-gray-300">
                <div className="py-24 px-2 lg:px-6">
                    <div className="mx-auto max-w-4xl overflow-hidden lg:overflow-visible space-y-24">
                        <div className="w-full flex flex-col items-stretch lg:flex-row justify-around space-y-8 lg:space-y-0 lg:space-x-8">

                            <div className="bg-white border-2 border-kddd-light-blue p-8 md:w-auto lg:w-96 flex-shrink-0 rounded">
                                <p className="text-xl font-semibold text-kddd-light-blue">
                                    One Day Ticket
                                </p>
                                <p className="text-kddd-dark-blue mt-2 mb-8">
                                    Valid for one day
                                </p>
                                <div className="w-full flex justify-center">
                                    <span className="text-3xl font-bold text-kddd-dark-blue">
                                        € 100
                                    </span>
                                </div>
                                <Link to="/home" target="_blank" >
                                    <div
                                        className="w-full my-8 p-4 text-center font-bold rounded shadow-sm text-blue-900 bg-transparent border-2 border-blue-500 hover:bg-blue-50"
                                    >
                                        Get your ticket here
                                    </div>
                                </Link>
                            </div>

                            <div className="bg-white border-2 border-kddd-light-blue p-8 md:w-auto lg:w-96 flex-shrink-0 rounded">
                                <p className="text-xl font-semibold text-kddd-light-blue">
                                    Two Days Ticket
                                </p>
                                <p className="text-kddd-dark-blue mt-2 mb-8">
                                    Valid for two days
                                </p>
                                <div className="w-full flex justify-center">
                                    <span className="text-3xl font-bold text-kddd-dark-blue">
                                        € 200
                                    </span>
                                </div>
                                <Link to="/home" target="_blank" >
                                    <div
                                        className="w-full my-8 p-4 text-center font-bold rounded shadow-sm text-blue-900 bg-transparent border-2 border-blue-500 hover:bg-blue-50"
                                    >
                                        Get your ticket here
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Tickets;