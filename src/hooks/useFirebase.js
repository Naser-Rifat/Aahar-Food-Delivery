import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";



initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsloading] = useState(true);

    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setIsloading(true)
        return signInWithPopup(auth, googleProvider);

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            }
            else {
                setUser({})
            }
            setIsloading(false)
        })
        return () => unsubscribe;

    }, [])

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
        setIsloading(false)
    }

    return {
        googleSignIn,
        setUser,
        user,
        setIsloading,
        isLoading,
        logOut

    }


}

export default useFirebase;