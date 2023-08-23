import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Results } from './pages/results';
import { Home } from './pages/home';
import { Footer } from './components/organisms/footer';
import { Header } from './components/organisms/header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/results/:showConfetti/:eventName/:eventSubtitle/:eventNumber/:eventDescription/:eventDate/:eventTime/:eventVenue/:eventSection/:eventRow/:eventSeat/:imgUrl/:ticketColor/:gifterName/:giftMessage/:mode" Component={Results} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
