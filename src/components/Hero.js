import logo from '../logo.svg';

function Hero() {
    return (
        <>
            <section id="hero" className="bg-gray-200">
                <div id="hero" className="App-header">

                    <img src={logo} className="App-logo" alt="logo" />
                    <p>This is the Hero Section</p>

                </div>
            </section>
        </>
    );
}

export default Hero;