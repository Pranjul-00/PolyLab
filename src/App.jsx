// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Droplet } from 'lucide-react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PolymerReactor from './pages/PolymerReactor';
import MaterialHub from './pages/MaterialHub';
import ComingSoon from './pages/ComingSoon';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/polymer-reactor" element={<PolymerReactor />} />
          <Route path="/material-hub" element={<MaterialHub />} />
          <Route
            path="/water-dashboard"
            element={
              <ComingSoon
                title="Water Dashboard"
                description="Analyze water quality data with interactive charts for hardness, alkalinity, and treatment efficiency. Coming soon to PolyLab!"
                icon={Droplet}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;