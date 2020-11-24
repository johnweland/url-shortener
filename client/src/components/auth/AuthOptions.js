import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const register = () => history.push('/register');
    const login = () => history.push('/login');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    }
    return (
        <ul className="navbar-nav">
            {
                userData.user ? (
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                            <svg width="1.25rem" height="1.25rem" viewBox="0 0 16 16" className="bi bi-person-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path fillRule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <li>
                                <Link className="dropdown-item" aria-current="page" role="button" to="/">Profile</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" aria-current="page" role="button" to="/">Settings</Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <Link onClick={logout} className="dropdown-item" aria-current="page" role="button" to="/">Logout</Link>
                            </li>
                        </ul>
                    </li>


                ) : (
                        <>
                            <li className="nav-item">
                                <Link onClick={register} className="nav-link mr-1" aria-current="page" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={login} className="nav-link" aria-current="page" to="/login">Sign In</Link>
                            </li>
                        </>
                    )
            }
        </ul>
    )
}
