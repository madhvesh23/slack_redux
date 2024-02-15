import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setUser,resetAuthStatus,setAuthStatus } from "./actions/userAction";
import { addDoc ,collection } from "firebase/firestore";
import { setLoading } from "./actions/userAction";
import Spinner from "./components/Spinner";
const firebaseConfig = {
  apiKey: "AIzaSyDZTh2ICntQ6RjvLpXW6DaS4hg06ynvo-0",
  authDomain: "slack-chatbot-redux.firebaseapp.com",
  projectId: "slack-chatbot-redux",
  storageBucket: "slack-chatbot-redux.appspot.com",
  messagingSenderId: "933654760194",
  appId: "1:933654760194:web:bc332d0a66e94e6bddd01b",
  measurementId: "G-NW0RLK7C6X",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);



const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};



const addUserToFirestore = async (uid, username, email) => {
  try {
    const userDocRef = await addDoc(collection(db, 'users'), {
      uid: uid,
      displayName: username,
      email: email,
    });
    return userDocRef;
  } catch (error) {
    throw error;
  }
};

const login = async (dispatch,email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth,email, password);
    // onAuthStateChanged will handle updating Redux state
    if(userCredential){
      dispatch(setLoading(true))
      dispatch(setUser(userCredential));
      dispatch(setAuthStatus())
      return userCredential.user;
    }
    else{
      dispatch(resetAuthStatus())
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }

};

const logout = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(setLoading(true))
    dispatch(setUser(null))
    dispatch(resetAuthStatus())
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};



export { auth, db, onAuthStateChanged ,createUser,addUserToFirestore,login,logout};
function Firebase() {
  const dispatch = useDispatch();  

  useEffect(() => {
    console.log("Firebase component: useEffect - Mounted");

    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (user) => {
      try {
        dispatch(setLoading(true)); // Set loading to true initially

        if (user) {
          dispatch(setUser(user));
          dispatch(setAuthStatus());
        } else {
          dispatch(resetAuthStatus());
        }
      } catch (error) {
        console.error("Error setting authenticated user details:", error);
      } finally {
        setTimeout(() => {
          dispatch(setLoading(false)); // Set loading to false once authentication state is determined
        }, 1100);
      }
    });

    return () => {
      unsubscribeAuthStateChanged();
    };
  }, [dispatch]);
  
  return <>
  <Spinner/>
  </>;
}

export default Firebase;
