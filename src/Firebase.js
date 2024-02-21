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
import { getStorage, ref as storageRef, uploadString } from "firebase/storage";
import {
  getDatabase,
  get,
  ref,
  set,
  push,
  onValue,
  off,
  update,
} from "firebase/database";
import { setLoading } from "./actions/userAction";
import { setChannelName } from "./actions/channelAction";
import Spinner from "./components/Spinner";
import { generateGravatarURL, uploadAvatarToStorage } from "./components/Avtar";

const firebaseConfig = {
  apiKey: "AIzaSyDZTh2ICntQ6RjvLpXW6DaS4hg06ynvo-0",
  authDomain: "slack-chatbot-redux.firebaseapp.com",
  databaseURL:
    "https://slack-chatbot-redux-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "slack-chatbot-redux",
  storageBucket: "slack-chatbot-redux.appspot.com",
  messagingSenderId: "933654760194",
  appId: "1:933654760194:web:bc332d0a66e94e6bddd01b",
  measurementId: "G-NW0RLK7C6X",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);

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

const updateStarred = async (uid, channelId, iconState) => {
  try {
    const userRealtimeRef = ref(database, `users/${uid}/star/${channelId}`);
    await set(userRealtimeRef, iconState);
  } catch (error) {
    console.log("Error in stroing star state in database");
  }
};

const addUserToFirestore = async (user, uid, username, name, email) => {
  try {
    // Generate Gravatar URL based on user's email
    const gravatarURL = generateGravatarURL(email);
    // Upload avatar to Firebase Storage
    const avatarURL = await uploadAvatarToStorage(uid, gravatarURL);
    await updateProfile(user, { displayName: username });

    const userRealtimeRef = ref(database, `users/${uid}`);
    await set(userRealtimeRef, {
      uid: uid,
      displayName: username,
      Name: name,
      avtar: avatarURL,
      email: email,
    });

    // using firestore
    // const userDocRef = doc(db, "users", uid);
    // await setDoc(userDocRef, {
    //   uid: uid,
    //   displayName: username,
    //   Name: name,
    //   avtar: avatarURL,
    //   email: email,
    // });

    return userRealtimeRef;
  } catch (error) {
    throw error;
  }
};

const channelCreation = async (uid, username, email, name, details) => {
  try {
    const channelsRef = ref(database, "channels");
    const newDataObjectRef = push(channelsRef);
    const newUid = newDataObjectRef.key;
    // Set up the channel data
    const channelData = {
      id: newUid,
      name: name,
      details: details,
      createdInfo: {
        userUid: uid,
        email: email,
        createdBy: username,
        timestamp: Date.now(),
      },
    };
    await set(newDataObjectRef, channelData);
    return { success: `created Channel- ${name}` };
  } catch (error) {
    console.error("Error adding channel to database!", error);
    return { error: "Error adding channel to database." };
  }
};

const fetchChannels = async (dispatch) => {
  try {
    const channelsRef = ref(database, "channels");
    onValue(channelsRef, (snapshot) => {
      const channelsData = [];
      snapshot.forEach((childSnapshot) => {
        const channel = childSnapshot.val();
        channelsData.push(channel);
      });
      dispatch(setChannelName(channelsData));
    });
    return () => {
      off(channelsRef);
    };
  } catch (error) {
    console.log("Error fetching channels from database!", error);
    throw { success: false, message: "Failed to fetch channels" };
  }
};

const fetchUserRealtime = async (uid, callback) => {
  try {
    const userRealtimeRef = ref(database, `users/${uid}`);

    // Set up a real-time listener for changes to the user data
    const unsubscribe = onValue(userRealtimeRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        // console.log("User data from Realtime Database:", userData);

        // Call the callback function with the updated user data
        if (callback) {
          callback(userData);
        }
      } else {
        console.log("User not found in Realtime Database");
      }
    });

    // Return the unsubscribe function to detach the listener when needed
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching user data from Realtime Database:", error);
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

const sendingMsg = async (channelId, content, username, userId, avtar) => {
  try {
    const messagesRef = ref(database, `messages/${channelId}`);
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      content: content,
      timestamp: Date.now(), // You can add a timestamp if needed
      sender: {
        username: username,
        uid: userId,
        avtar: avtar,
      },
    });
    return newMessageRef;
  } catch (error) {
    console.log("Error in storing into databse msgs");
  }
};
const fetchingMsg = (channelId,callback) => {
    // const channelId = "-Nr5ek8wlNANdLCNJI0P";
    const messagesRef = ref(database, `messages/${channelId}`);
  
    const messagesListener = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      const messagesArray = [];
  
      if (messagesData) {
        Object.keys(messagesData).forEach((messageId) => {
          const message = messagesData[messageId];
          messagesArray.push(message);
        });
      }
      // Call the provided callback with the messages
      callback(messagesArray);
    });
  
    // Return a cleanup function to remove the listener when needed
    return () => {
      off(messagesRef, 'value', messagesListener);
    };
  };


export {
  auth,
  db,
  onAuthStateChanged,
  createUser,
  login,
  logout,
  channelCreation,
  updateStarred,
  sendingMsg,
  fetchingMsg
};
function Firebase() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      async (user) => {
        try {
          dispatch(setLoading(true));
          if (user) {
            const { uid, displayName, email } = user;
            await fetchUserRealtime(uid, (userData) => {
              if (userData) {
                dispatch(setUser({ ...user, ...userData }));
                dispatch(setAuthStatus());
                fetchChannels(dispatch);
              } else {
                dispatch(resetAuthStatus());
              }
            });
          } else {
            dispatch(resetAuthStatus());
          }
        } catch (error) {
          console.error("Error setting authenticated user details:", error);
        } finally {
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 500);
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
