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
        <title>Pretty Tickets | Turn ordinary purchases into beautiful, digitally-sharable commemorative tickets</title>
        <meta
          name="description"
          content="Pretty Tickets | Turn ordinary purchases into beautiful, digitally-sharable commemorative tickets."
        />
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
