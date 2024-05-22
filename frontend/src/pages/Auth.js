import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

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
                history.push('/'); // Redirect to home page after login
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
            history.push('/login'); // Redirect to login page after logout
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
