import logo from './../img/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import './../style/app.css';

export default function Header() {
    return (
        <header className='App__header'>
            <Link to='/'>
                <img src={logo} className='App__header-logo' alt='logo' />
            </Link>
            <div>
                <p style={{ textAlign: "right", paddingRight: "40px" }}>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
            <Link to='/login'>
                <div className='App__header-link'>LOGIN</div>
            </Link>
        </header>
    );
};