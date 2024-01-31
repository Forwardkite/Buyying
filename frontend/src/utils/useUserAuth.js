"use client";
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // Define your authentication logic here
      const checkIfAuthenticated = () => {
        // Example: Check if user is authenticated (e.g., by looking for a token in localStorage)
        const userLoggedIn = !!localStorage.getItem('accessToken');
        return userLoggedIn;
      };

      // Check if the user is authenticated when the component mounts
      const isAuthenticated = checkIfAuthenticated();
      setIsLoggedIn(isAuthenticated);

      // Ensure that Router is only used on the client-side
      if (!isAuthenticated && typeof window !== 'undefined') {
        // Import Router dynamically to ensure it's only used on the client-side
        const Router = require('next/router').default;

        // Use useEffect to ensure Router.push is called after the component is mounted
        useEffect(() => {
          Router.push('/login');
        }, []);
      }
    }, []);

    // Render the wrapped component if user is authenticated
    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return WithAuthComponent;
};

export default withAuth;
