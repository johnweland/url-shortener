import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import UserContext from "../../context/UserContext";
import Alert from '../misc/Alert';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const user = {
                email,
                password,
                passwordCheck,
                displayName
            }
            await Axios.post('http://localhost:5000/api/user/register', user);

            const login = await Axios.post('http://localhost:5000/api/user/login', {
                email,
                password
            });
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
        {error && <Alert message={error} context={'warning'} />}
        <div className="container py-5 d-flex flex-column">
            <img src={process.env.PUBLIC_URL + 'apple-touch-icon.png'} alt="URL Shortener Logo" className="mx-auto mb-5"/>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-center display-4">Create an Account</h2>
                            <form onSubmit={submit}>
                                <label htmlFor="register-email" className="mt-1">Email</label>
                                <input id="register-email" type="email" className="form-control mt-1" placeholder="bob.ross@example.com" onChange={(e) => setEmail(e.target.value)} required />

                                <label htmlFor="register-password" className="mt-1">Password</label>
                                <input id="register-password" type="password" className="form-control mt-1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                                <input id="register-password-check" type="password" className="form-control mt-1" placeholder="Confirm Password" onChange={(e) => setPasswordCheck(e.target.value)} required />

                                <label htmlFor="register-display-name" className="mt-1">Display Name</label>
                                <input id="register-display-name" type="text" className="form-control mt-1" placeholder="Bob" onChange={(e) => setDisplayName(e.target.value)} />

                                <input type="submit" value="Register" className="btn btn-primary mt-5" />
                            </form>
                        </div>
                    </div>
                    <Link className="nav-link mr-1" aria-current="page" to="/login">Already have an account?</Link>
                </div>
            </div>
        </div>
        </>
    )
}
