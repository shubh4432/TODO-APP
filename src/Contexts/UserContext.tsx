"use client";
// UserContext.tsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext<{
  user: null | any;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<null | any>>;
}>({
  user: null,
  isLoggedIn: false,
  setUser: () => {}
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = user !== null;

  // Check for saved user in local storage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user in local storage when it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

