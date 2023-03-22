// Import the functions you need from the SDKs you need
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, set, get } from "firebase/database";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABFVW-AgGP6OrHMrHnYSBD4dWv19fMjFY",
  authDomain: "nuprojects-37022.firebaseapp.com",
  databaseURL: "https://nuprojects-37022-default-rtdb.firebaseio.com",
  projectId: "nuprojects-37022",
  storageBucket: "nuprojects-37022.appspot.com",
  messagingSenderId: "895929247438",
  appId: "1:895929247438:web:651215d43228c05bef929f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const updateDatabase = (updates) => {
  const db = getDatabase();
  return update(ref(db), updates);
};

export const getData = async (path) => {
  const db = getDatabase();
  const snapshot = await get(ref(db, path));
  const data = snapshot.val();
  return data;
};

export const writeJobData = (params) => {
  const db = getDatabase();
  set(ref(db, "jobs/" + params.jobId), {
    // default empty if no value passed
    contactInfo: params.contactInfo || "",
    datePosted: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
    dateToSubmit: params.dateToSubmit || "",
    projectStartDate: params.projectStartDate || "",
    projectEndDate: params.projectEndDate || "",
    description: params.description || "",
    hashtags: params.hashtags || [""],
    numberOfPeople: params.numberOfPeople || "",
    positionName: params.positionName || "",
    projectName: params.projectName || "",
    skillsRequired: params.skillsRequired || [""],
    typeOfProject: params.typeOfProject || "",
    user: params.user || "",
    wage: params.wage || "",
    jobId: params.jobId || "",
  });
};

//write a test to the database

//write a user to the database
export const writeUserData = async (params) => {
  const db = getDatabase();
  const userData = await getData("users/");

  for (let user in userData) {
    if (!user.userId) continue;
    if (user.userId === params.userId) {
      return;
    }
  }

  set(ref(db, "users/" + params.userId), {
    userId: params.userId || "",
    name: params.name || "",
    email: params.email || "",
    profilePic: params.profilePic || "",
    jobsCreated: params.jobsCreated || [],
    jobsApplied: params.jobsApplied || [],
    jobsSaved: params.jobsSaved || [],
  });
};

// Google Authentication Hook
export const signInWithGoogle = async () => {
  const userCredentials = await signInWithPopup(
    getAuth(app),
    new GoogleAuthProvider()
  );
  const additionalInfo = getAdditionalUserInfo(userCredentials);
  const user = userCredentials.user;
  if (additionalInfo && additionalInfo.isNewUser) {
    const params = {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
      jobsCreated: [],
      jobsApplied: [],
      jobsSaved: [],
    };
    await writeUserData(params);
  }
  return user;
};

export const signOut = () => firebaseSignOut(getAuth(app));
