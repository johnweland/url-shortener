import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Axios from 'axios';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserContext from "./context/UserContext";
import Footer from './components/layout/Footer';

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const valid = await Axios.post("http://localhost:5000/api/user/validate",
                null,
                {
                    headers: {
                        "x-auth-token": token
                    }
                }
            );
            if (valid.data) {
                const user = await Axios.get("http://localhost:5000/api/user/",
                    {
                        headers: {
                            "x-auth-token": token
                        }
                    }
                );
                setUserData({
                    token,
                    user: user.data
                });
            }
        }

        checkLoggedIn();
    }, []);

    return <>
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRoute path="/profile" component={Profile} />
                </Switch>
                <Footer />
            </UserContext.Provider>
        </BrowserRouter>
    </>
}