import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import './../style/login.css';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const formRef = useRef(null);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === 'mdeng@uwaterloo.ca' && password === 'htn2024') {
            onLogin(true);
            formRef.current.reset();
            navigate("/");
        } else {
            alert("failed login");
        }
    };

    return (
        <div className='Login'>
            <section className='Login__section'>
                <h1>LOGIN</h1>
                <form ref={formRef}>
                    <div><input className="Login__section-input" type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} /></div>
                    <div><input className="Login__section-input" type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} /></div>
                    <div><button className="Login__section-submit" type="submit" onClick={handleLogin}>LOGIN</button></div>
                </form>
            </section>
        </div>
    );
};