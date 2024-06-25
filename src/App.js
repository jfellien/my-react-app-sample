import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Pages from './components/Pages';

function App() {
  return (
    <>
      <Router>
        <Pages />
        <Footer />
      </Router>
    </>
  );
}

export default App;
