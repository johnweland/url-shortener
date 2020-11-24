import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import UserContext from "../../context/UserContext";
import Alert from '../misc/Alert';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const user = {
                email,
                password,
            }

            const login = await Axios.post('http://localhost:5000/api/user/login', user);
            setUserData({
                token: login.data.token,
                user: login.data.user
            });
            localStorage.setItem("auth-token", login.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.message && setError(err.response.data.message);
        }
    }

    return (
        <>
        {error && <Alert message={error} context={'danger'} />}
        <div className="container py-5 d-flex flex-column">
            <img src={process.env.PUBLIC_URL + 'apple-touch-icon.png'} alt="URL Shortener Logo" className="mx-auto mb-5"/>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-center display-4">Sign In</h2>
                            <form onSubmit={submit}>
                                <label htmlFor="login-email" className="mt-1">Email</label>
                                <input id="login-email" type="email" className="form-control mt-1" placeholder="bob.ross@example.com" onChange={(e) => setEmail(e.target.value)} required />

                                <label htmlFor="login-password" className="mt-1">Password</label>
                                <input id="login-password" type="password" className="form-control mt-1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                                <input type="submit" value="Sign In" className="btn btn-primary mt-5" />
                            </form>
                        </div>
                    </div>
                    <Link className="nav-link mr-1" aria-current="page" to="/register">Need an account?</Link>
                </div>
            </div>
        </div>
        </>
    )
};
