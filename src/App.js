import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Events from './pages/Events';
import Login from './pages/Login';
import Logged from './pages/Logged';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route index element={<Events />} />
        <Route path="/home" element={<Events />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/logged" element={<Logged />} />
      </Routes>
    </BrowserRouter>
  );
};
