import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Results } from './pages/results';
import { Home } from './pages/home';
import { Footer } from './components/organisms/footer';
import { Header } from './components/organisms/header';
import { useEffect } from 'react';
import { preloadImages } from './helpers/prefetch';
import { Helmet } from 'react-helmet-async';
import { Disclaimer } from './components/molecules/disclaimer';
import ReactGA from 'react-ga4';

function App() {
  useEffect(() => {
    preloadImages();
    ReactGA.initialize("G-FHTP63HHFY");
  }, []);

  return (
    <>
      <Helmet>
        <title>Pretty Tickets</title>
        <meta property="og:title" content="Pretty Tickets | Transform purchases into beautiful commemorative tickets." />
        <meta property="og:description" content="Pretty Tickets | Transform purchases into beautiful commemorative tickets." />
      </Helmet>
      <div className='min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50'>
        <Router>
          <Header />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/results" Component={Results} />
          </Routes>
          <Disclaimer />
          <Footer />
        </Router>
      </div >
    </>
  );
}

export default App;
