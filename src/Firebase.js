import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setUser, resetAuthStatus, setAuthStatus } from "./actions/userAction";
import {
  addDoc,
  collection,
  updateDoc,
  getDoc,
  setDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { setLoading } from "./actions/userAction";
import Spinner from "./components/Spinner";
import { generateGravatarURL, uploadAvatarToStorage } from "./components/Avtar";

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

const createUser = async (email, password, username, name) => {
  try {
    // const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    // console.log(signInMethods)
    // if (signInMethods && signInMethods.length > 0) {
    //   // User already exists
    //   console.log("User already exists");
    //   return null; // or throw an error, depending on your requirements
    // }
    // console.log("aa")
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      const { uid } = user;
      await addUserToFirestore(user, uid, username, name, email);
      return userCredential;
    } else {
      console.log("Error while registeration");
    }
  } catch (error) {
    throw error;
  }
};

const addUserToFirestore = async (user, uid, username, name, email) => {
  try {
    // Generate Gravatar URL based on user's email
    const gravatarURL = generateGravatarURL(email);
    // Upload avatar to Firebase Storage
    const avatarURL = await uploadAvatarToStorage(uid, gravatarURL);
    await updateProfile(user, { displayName: username });
    const userDocRef = doc(db, "users", uid);

    await setDoc(userDocRef, {
      uid: uid,
      displayName: username,
      Name: name,
      avtar: avatarURL,
      email: email,
    });
    console.log(userDocRef);
    return userDocRef;
  } catch (error) {
    throw error;
  }
};

const login = async (dispatch, email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // onAuthStateChanged will handle updating Redux state
    if (userCredential) {
      dispatch(setLoading(true));
      dispatch(setUser(userCredential));
      dispatch(setAuthStatus());
      return userCredential.user;
    } else {
      dispatch(resetAuthStatus());
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

const logout = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(setLoading(true));
    dispatch(setUser(null));
    dispatch(resetAuthStatus());
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

export { auth, db, onAuthStateChanged, createUser, login, logout };
function Firebase() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Firebase component: useEffect - Mounted");

    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      async (user) => {
        try {
          dispatch(setLoading(true)); // Set loading to true initially
          if (user) {
            const { uid, displayName, email } = user;
            const userDocRef = doc(db, "users", uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              console.log(
                "User document exists. Additional user details:",
                userData
              );
              dispatch(setUser({ ...user , ...userData}));
              dispatch(setAuthStatus());

              // Dispatch actions or set state with the additional details
            } else {
              console.log(
                "User document does not exist in Firestore for uid:",
                uid
              );
              dispatch(resetAuthStatus());
            }
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
      }
    );

    return () => {
      unsubscribeAuthStateChanged();
    };
  }, [dispatch]);

  return (
    <>
      <Spinner />
    </>
  );
}

export default Firebase;
