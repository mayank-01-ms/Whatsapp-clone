import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import "./styles/Login.css";

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
        })
        .catch(error => console.log(error));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/archive/6/6b/20200905003027%21WhatsApp.svg"
                    alt="Logo"
                />
                <div className="login__text">
                    <h1>Sign in</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login;
