import logo from './../img/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import './../style/app.css';

export default function Header() {
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

            {/* <Link to='/login'>
                <div className='App__header-link' style={{ height: "30px" }}>LOGIN</div>
            </Link> */}

            {/* <div className='App__header-pfp'>
                <div className='App__header-pfp-icon'>M</div>
            </div> */}
        </header >
    );
};


// to do on this page
// add a property IsLoggedIn, if it is true, show pfp, else, show Login