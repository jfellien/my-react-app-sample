import Hero from "../components/Hero";
import NavigationBar from "../components/NavigationBar";
import Tickets from "../components/Tickets";

function Home() {
    return (
        <>
            <NavigationBar />
            <Hero />
            <Tickets />
        </>
    );
}

export default Home;