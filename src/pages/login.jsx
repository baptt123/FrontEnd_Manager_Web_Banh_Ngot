// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    // 🔒 Auto login nếu đã có cookie JWT
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/auth/me', {
                    withCredentials: true,
                });
                if (res.status === 200) {
                    navigate('/home');
                }
            } catch (err) {
                // Không làm gì nếu chưa login
            }
        };
        checkLogin();
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/login',
                { username, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                navigate('/home');
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Không thể kết nối tới máy chủ');
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>
                <h2>Login</h2>
                {errorMsg && <div className="error">{errorMsg}</div>}
                <input
                    type="text"
                    placeholder="email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">LOGIN</button>
                <p className="signup-text">Sign up</p>
            </form>
        </div>
    );
};

export default LoginPage;
