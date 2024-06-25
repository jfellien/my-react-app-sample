import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Imprint from '../pages/Imprint';
import GDPR from '../pages/GDPR';


function Pages() {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/Home" exact element={<Home />} />
            <Route path="/Imprint" exact element={<Imprint />} />
            <Route path="/GDPR" exact element={<GDPR />} />
        </Routes>
    )
}

export default Pages;