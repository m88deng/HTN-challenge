import logo from './../img/logo.svg';
import React from 'react';
import ProfileIcon from './ProfileIcon';
import { Link } from 'react-router-dom';
import './../style/app.css';

export default function Header({ isLoggedIn, onLogout }) {

    return (
        <header className='App__header'>
            <Link to='/'>
                <div style={{ height: "30px" }}>
                    <img src={logo} className='App__header-logo' alt='logo' />
                </div>
            </Link>
            <div style={{ height: "30px", textAlign: "right", paddingRight: "30px" }}>
                Edit and save to reload.
            </div>
            <ProfileIcon isLoggedIn={isLoggedIn} onLogout={onLogout} />
        </header >
    );
};


// to do on this page
// add a property IsLoggedIn, if it is true, show pfp, else, show Login