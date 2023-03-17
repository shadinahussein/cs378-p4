import { auth, db} from '../config/firebase';
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import React, { useState, useEffect } from "react";
import { redirect, useNavigate} from 'react-router-dom';


export const AuthLogIn = ({ currentUser, setCurrentUser}) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            navigate("/home");
          } catch (error) {
            if (error.code === "auth/user-not-found") {
              try {
                const {user} = await createUserWithEmailAndPassword(auth, email, pass);
                const userId = user.uid;
                console.log("NEW USER: ", user.email)
                const userRef = ref(db,"users/" + userId);
                await set(userRef, {
                    username: email,
                    cities: [ ]
                })

                navigate("/home");
              } catch (error) {
                console.log(error);
              }
            } else {
              console.log(error);
            }
          }
    };

    //if user already logged in redirect to user home page
    //MOVED CODE INTO USE EFFECT
    // if (currentUser) {
    //     navigate('/home');
    //     console.log(currentUser.email)
    // }

    return (
        <div>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password" type="password" onChange={(p) => setPass(p.target.value)}/>
            <button onClick={signIn}>Sign In</button>            
        </div>
    )  
}


export const  AuthLogOut = ({currentUser}) => {
    const navigate = useNavigate();
    const handleSignOut = async () => {
        console.log("USER TRYING TO SIGN OUT", currentUser?.email)
        try {
            // if(currentUser){
                await signOut(auth)
                navigate("/");
            // } else {
            //     console.log("NO USER SIGNED IN", currentUser?.email)
            // }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>   
        </div>
    )
}