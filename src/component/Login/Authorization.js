import React, { useEffect } from "react";
import { useAuth } from '../context/authContext';

export const Authorization = () => {
    const { isAuthenticated } = useAuth();
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            isAuthenticated();
        }, 300000); // 300,000 milliseconds = 5 minutes

        // Cleanup interval on component unmount
        
        return () => clearInterval(intervalId);
    }, [isAuthenticated]);

    return null;
};
