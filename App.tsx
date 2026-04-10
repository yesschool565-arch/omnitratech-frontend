import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { SettingsProvider } from './utils/settings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import SolutionDetail from './components/SolutionDetail';
import IndustryDetail from './components/IndustryDetail';
import Careers from './components/Careers';
import ScrollToHashElement from './components/ScrollToHashElement';
import ResourceDetail from './components/ResourceDetail';
import AdminDashboard from './components/AdminDashboard';

const PublicLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <Router>
        <ScrollToHashElement />
        <div className="min-h-screen flex flex-col font-sans">
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/solutions/:slug" element={<SolutionDetail />} />
              <Route path="/industries/:slug" element={<IndustryDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/resources/:slug" element={<ResourceDetail />} />
            </Route>

            {/* Separate Admin Route */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </SettingsProvider>
  );
};




export default App;