import React, { useContext, useRef } from "react";
import AuthContext from "./authprovider.js";
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';

function SignUp() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const { user } = auth;
    const { createUserWithEmailAndPassword } = auth.methods;

    const signUp = async (e) => {
        e.preventDefault();            
        let firstName = firstNameRef.current.value;
        let lastName = lastNameRef.current.value;

        firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                await user.updateProfile({
                    displayName: `${firstName} ${lastName}`
                });
                alert("User Created!");
                history.push('/sign-in');
            }
        });

        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);        
        // validation here with newUser
    };

    return (<form>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" ref={firstNameRef} />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" ref={lastNameRef} />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" ref={emailRef} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" ref={passwordRef} />
            </div>

            <button className="btn btn-primary btn-block" onClick={signUp}>Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
        </form>);
    };

    export default SignUp;
