import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Results } from './pages/results';
import { Home } from './pages/home';
import { Footer } from './components/organisms/footer';
import { Header } from './components/organisms/header';
import { useEffect } from 'react';
import { preloadImages } from './helpers/prefetch';
import { Helmet } from 'react-helmet-async';

function App() {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <>
      <Helmet>
        <title>Pretty Tickets</title>
        <meta property="og:title" content="Pretty Tickets | Turn ordinary purchases into beautiful, digitally-sharable commemorative tickets" />
        <meta property="og:description" content="Pretty Tickets | Turn ordinary purchases into beautiful, digitally-sharable commemorative tickets" />
        <meta property="og:url" content="https://prettytickets.com" />
        <meta property="og:image" content="https://prettytickets.com/logo500.png" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:image:alt" content="Ticket Logo" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/results" Component={Results} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
