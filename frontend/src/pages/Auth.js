import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch('/is_logged_in', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => response.json())
        .then(data => {
            setIsLoggedIn(data.logged_in);
        })
        .catch(error => {
            console.error("There was an error checking the login status!", error);
        });
    }, []);

    const login = (username, password) => {
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Login successful") {
                setIsLoggedIn(true);
            }
            return data;
        });
    };

    const logout = () => {
        return fetch('/logout', {
            method: 'POST',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => response.json())
        .then(data => {
            setIsLoggedIn(false);
            return data;
        });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
