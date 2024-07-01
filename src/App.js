// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';

const App = () => {
    const isLogin = useSelector(state => state.auth.isLogin);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to={isLogin ? "/profile" : "/login"} />} />
                <Route path="/login" element={isLogin ? <Navigate to="/profile" /> : <AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/profile" element={isLogin ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
};

export default App;
