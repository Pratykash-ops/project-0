// contexts/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/data/user');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
      setLoading(false)
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{user, loading}}>{children}</UserContext.Provider>;
};
