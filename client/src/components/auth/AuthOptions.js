import React from 'react';
import { useHistory } from 'react-router-dom'

export default function AuthOptions() {
    const history = useHistory();
    const register = () => history.push('/register');
    const login = () => history.push('/login');
    return (
        <div className=" d-flex">
            <button onClick={register} className="btn btn-outline-default mr-1" aria-current="page" to="/register">Register</button>
            <button onClick={login} className="btn btn-outline-default" aria-current="page" to="/login">Sign In</button>
        </div>
    )
}
