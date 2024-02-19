import logo from './../img/logo.svg';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../style/login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState('false');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        //validation and authentication
        if (email === 'mdeng@uwaterloo.ca' && password === 'htn2024') {
            setIsLoggedIn(true);
            navigate("/logged");
        } else {
            alert("failed login");
        }
    };

    return (
        <div className='Login'>
            <header className='Login__header'>
                <Link to='/'>
                    <img src={logo} className='Login__header-logo' alt='logo' />
                </Link>
            </header>
            <section className='Login__section'>
                <h1>LOGIN</h1>
                <form>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={handleLogin}>LOGIN</button>
                </form>
            </section>
        </div>
    );
};