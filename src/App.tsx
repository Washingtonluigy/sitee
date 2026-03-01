import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import UserTypeSelection from './components/UserTypeSelection';
import SimpleSteps from './components/SimpleSteps';
import Specialties from './components/Specialties';
import Transparency from './components/Transparency';
import ValidationSection from './components/ValidationSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import WhatsAppButton from './components/WhatsAppButton';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <UserTypeSelection />
      <SimpleSteps />
      <Specialties />
      <Transparency />
      <ValidationSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}

export default App;
