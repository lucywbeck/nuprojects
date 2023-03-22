import React, { useEffect, useMemo, useState, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, getData } from "../utilities/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuthListener = onAuthStateChanged(
      getAuth(app),
      async (user) => {
        if (user) {
          await setUserFromDatabase(user.uid);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      unsubscribeAuthListener();
    };
  }, []);

  const setUserFromDatabase = async (userId) => {
    const userFromDatabase = await getData("/users/" + userId);
    setUser({ ...userFromDatabase });
  };

  const value = useMemo(
    () => ({
      user,
      setUserFromDatabase,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
