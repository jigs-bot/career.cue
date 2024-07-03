// TokenContext.js
import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

 const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
    };

    return (
        <TokenContext.Provider value={{ token, updateToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export {TokenContext , TokenProvider};
