import { Link } from "react-router-dom";

const tickets = await( await fetch(`/api/tickets`)).json();

const renderTicket = (ticket) => {
    return (
        <div key={crypto.randomUUID()}
            className="bg-white border-2 border-kddd-light-blue p-8 md:w-auto lg:w-96 flex-shrink-0 rounded">
            <p className="text-xl font-semibold text-kddd-light-blue">
                {ticket.name}
            </p>
            <p className="text-kddd-dark-blue mt-2 mb-8">
                Valid for {ticket.validFor}
            </p>
            <div className="w-full flex justify-center">
                <span className="text-3xl font-bold text-kddd-dark-blue">
                    € {ticket.price}
                </span>
            </div>
            <Link to={ticket.bookingLink} target="_blank" >
                <div
                    className="w-full my-8 p-4 text-center font-bold rounded shadow-sm text-blue-900 bg-transparent border-2 border-blue-500 hover:bg-blue-50"
                >
                    Get your ticket here
                </div>
            </Link>
        </div>
    );
}

function Tickets() {

    return (
        <>
            <section id="tickets" className="bg-gray-300">
                <div className="py-24 px-2 lg:px-6">
                    <div className="mx-auto max-w-4xl overflow-hidden lg:overflow-visible space-y-24">
                        <div className="w-full flex flex-col items-stretch lg:flex-row justify-around space-y-8 lg:space-y-0 lg:space-x-8">

                            {tickets.map(renderTicket)}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Tickets;