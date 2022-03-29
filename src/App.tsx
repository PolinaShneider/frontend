import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';

import { Home } from './pages/Home';
import { Registration } from './pages/Registration';
import { Shop } from './pages/Shop';
import { Transfers } from './pages/Transfers';
import { UserProfile } from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;
