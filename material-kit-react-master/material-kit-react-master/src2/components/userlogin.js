import React,{useState,useRef, useContext} from "react";
import AuthContext, { AuthProvider } from "./authprovider.js";
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';



function Login(props){
    const history = useHistory();
    const auth = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();

    const user = auth.user;
    const {
      signOut,
      signInWithGoogle,
      signInWithEmailAndPassword
    } = auth.methods;

    console.log(props);
    const googleLogin = (e) => {
        e.preventDefault();
        signInWithGoogle(e);
    };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            history.push('/dashboard')
        }
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let results= await signInWithEmailAndPassword(email,password);
        console.log(results);
    }

    const getUserDetails = () => {
        if(!user) return "NO USER";
        else return `Welcome ${user.displayName}!`;
    }
        return (
            <form>
                <h3>Sign In</h3>
                <div>{getUserDetails()}</div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" ref={emailRef} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" ref={passwordRef} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
                <button className="btn btn-primary btn-block" onClick={googleLogin}>Google</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    };
    
export default Login;