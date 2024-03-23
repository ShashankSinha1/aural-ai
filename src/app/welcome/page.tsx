"use client";

import { useUser, useRedirectFunctions, useLogoutFunction } from "@propelauth/nextjs/client";

const WelcomeMessage = () => {
    const { loading, user } = useUser();
    const { redirectToSignupPage, redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();
    const logout = useLogoutFunction(); // Corrected variable name

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle any errors that might occur during logout
        }
    };

    if (loading) return <div>Loading...</div>;

    if (user) {
        return (
            <div>
                <p>You are logged in as {user.email}</p>
                <button onClick={() => redirectToAccountPage()}>Account</button>
                <button onClick={handleLogout}>Logout</button> {/* Use handleLogout */}
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not logged in</p>
                <button onClick={() => redirectToLoginPage()}>Login</button>
                <button onClick={() => redirectToSignupPage()}>Signup</button>
            </div>
        );
    }
};

export default WelcomeMessage;



