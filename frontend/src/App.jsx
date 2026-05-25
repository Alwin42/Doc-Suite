import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import EditorWorkspace from './components/EditorWorkspace';

function App() {
  return (
    <Routes>
      {/* 1. The Security Gate */}
      <Route path="/" element={<LandingPage />} />
      
      {/* 2. The Main Dashboard */}
      <Route path="/home" element={<Home />} />
      
      {/* 3. The Document Editor */}
      <Route path="/editor" element={<EditorWorkspace />} />
    </Routes>
  );
}

export default App;