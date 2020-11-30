import React, { useState, useContext } from 'react';
import Alert from '../misc/Alert';
import Axios from 'axios';
import UserContext from "../../context/UserContext";

export default function Profile() {
    const { userData } = useContext(UserContext);
    const [isDisabled, setIsDisabled] = useState(true);
    const [email, setEmail] = useState(userData.user.email);
    const [password, setPassword] = useState(undefined);
    const [passwordCheck, setPasswordCheck] = useState(undefined);
    const [displayName, setDisplayName] = useState(userData.user.displayName);
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const update = {
                email,
                password,
                passwordCheck,
                displayName
            }
            let response = await Axios.patch('http://localhost:5000/api/user', update, {
                headers: {
                    "x-auth-token": userData.token
                }
            });
            response.data.message && setMessage(response.data.message);
        } catch (err) {
            err.response.data.message && setError(err.response.data.message);
        }
    }
    return (
        <>
        {error && <Alert message={error} context={'danger'} />}
        {message && <Alert message={message} context={'success'} />}
        <div className="container py-5 d-flex flex-column align-items-center">
            <svg width="12rem" height="12rem" viewBox="0 0 16 16" className="bi bi-person-square mb-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path fillRule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <div className="row w-50">
                <div className="">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-center display-4">Profile</h2>
                            <form onSubmit={submit}>
                            <label htmlFor="register-display-name" className="mt-1">Display Name</label>
                                <input id="register-display-name" type="text" className="form-control mt-1" placeholder="Bob" data-oldvalue={userData.user.displayName} value={displayName} onChange={(e) => {
                                    if (e.target.value !== e.target.dataset.oldvalue) {
                                        setIsDisabled(false);
                                        setDisplayName(e.target.value);
                                    } else {
                                        setIsDisabled(true);
                                        setDisplayName(e.target.dataset.oldvalue);
                                    }
                                }} />

                                <label htmlFor="login-email" className="mt-1">Email</label>
                                <input id="login-email" type="email" className="form-control mt-1" placeholder="bob.ross@example.com" data-oldvalue={userData.user.email} value={email} onChange={(e) => {
                                    if (e.target.value !== e.targete.dataset.oldvalue) {
                                        setIsDisabled(false);
                                        setEmail(e.target.value);
                                    } else {
                                        setIsDisabled(true);
                                        setEmail(e.targete.dataset.oldvalue);
                                    }
                                }} />

                                <label htmlFor="login-password" className="mt-1">Password</label>
                                <input id="login-password" type="password" className="form-control mt-1" placeholder="Password" onChange={(e) => {
                                    if (e.target.value !== "") {
                                        setIsDisabled(false);
                                        setPassword(e.target.value);
                                    } else {
                                        setIsDisabled(true);
                                        setPassword(undefined);
                                    }
                                }}/>
                                <input id="register-password-check" type="password" className="form-control mt-1" placeholder="Confirm Password" onChange={(e) => {
                                    if (e.target.value !== "") {
                                        setIsDisabled(false);
                                        setPasswordCheck(e.target.value);
                                    } else {
                                        setIsDisabled(true);
                                        setPasswordCheck(undefined);
                                    }
                                }} />

                                <input type="submit" value="Update" className="btn btn-primary mt-5" disabled={isDisabled}/>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}
