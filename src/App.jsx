// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Droplet } from 'lucide-react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PolymerReactor from './pages/PolymerReactor';
import MaterialHub from './pages/MaterialHub';
import WaterAnalysis from './pages/WaterAnalysis/WaterAnalysis';
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
          <Route path="/water-dashboard" element={<WaterAnalysis />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;