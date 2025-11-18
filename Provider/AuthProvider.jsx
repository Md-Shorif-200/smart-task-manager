"use client"
import React, {  createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '@/firebase.init';



export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()
    console.log(user);
    

    useEffect(() => {

        const unsbscribe = onAuthStateChanged(auth,currentUser => {
             setUser(currentUser);
            //   console.log(currentUser);
              
             setLoading(false)

           return () => {
            return unsbscribe()
           }

        })

    },[])

    // creat new user with signUp
    
    const creatUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // log In

    const logIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // google log In

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    // log out

const logOut = () => {
    setLoading(true)
    return signOut(auth)
}


// update Profile
const updateUserProfile = (name,photoUrl) => {
return updateProfile(auth.currentUser, {
    displayName
 : name, photoURL : photoUrl
})
}


    const authInfo = {
            user,
            loading,
            creatUser,
            logIn,
            logOut,
            updateUserProfile,
            googleSignIn
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;