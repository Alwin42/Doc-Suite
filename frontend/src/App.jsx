import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EditorWorkspace from './components/EditorWorkspace';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/editor" element={<EditorWorkspace />} />
    </Routes>
  );
}

export default App;