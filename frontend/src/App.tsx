import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Home from './Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {/*<Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />*/}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />*/}
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App
