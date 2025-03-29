import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UsersList from './pages/UserList';
import './App.css'; 
import EditUser from './components/EditUser'; 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/users" element={isLoggedIn ? <UsersList /> : <Navigate to="/login" />} />
        <Route path="/" element={isLoggedIn ? <Login/> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isLoggedIn ? <EditUser /> : <Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
