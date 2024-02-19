import logo from './../img/logo.svg';
// import React from 'react';
import { Link } from 'react-router-dom';
import './../style/login.css';

export default function Login() {
    return (
        <div className='Login'>
            <header className='Login__header'>
                <Link to='/'>
                    <img src={logo} className='Login__header-logo' alt='logo' />
                </Link>
            </header>
            <section className='Login__section'>
                <h1>LOGIN</h1>
            </section>
        </div>
    );
};