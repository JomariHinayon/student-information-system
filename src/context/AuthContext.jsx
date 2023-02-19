// For authentication so that login user will be global to all pages
import React, { useContext, useEffect, useState } from "react";
// this is the connection to firebase database in firebase.js
import { auth, db } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// children in args are use to pass the current user information or data globally
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // for registering the student or you can change this code to axios or local server
  function registerStudent(email, password, fieldsValue) {
    setDoc(doc(db, "students", email), fieldsValue);
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // for login page or you can change this code to axios or local server
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // for logout of student current user
  function logout() {
    auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    registerStudent,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
