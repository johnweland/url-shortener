import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions'
export default function Header() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light shadow-lg">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={process.env.PUBLIC_URL + 'favicon-32x32.png'} alt="" width="24" height="24" className="d-inline-block align-middle" /> URL Shortener
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                    <AuthOptions />
                </div>
            </div>
        </nav>
    )
}
