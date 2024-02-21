import logo from './../img/logo.svg';
import React from 'react';
import ProfileIcon from './ProfileIcon.js';
import './../style/App.css';

import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn, onLogout }) {

    return (
        <header className='App__header'>
            <Link to='/'>
                <div style={{ height: "30px" }}>
                    <img src={logo} className='App__header-logo' alt='logo' />
                </div>
            </Link>
            <ProfileIcon isLoggedIn={isLoggedIn} onLogout={onLogout} />
        </header >
    );
};
