import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './App.css';
function getUsernameFromUrl() {
    // Get the current URL
    const urlParams = new URLSearchParams(window.location.search);
  
    // Retrieve the 'username' parameter value
    const username = urlParams.get('username');
  
    // Check if username is valid
    return username !== 'undefined' && username ? username : null;
  }
export default function Verify() {
    const [verificationCode, setVerificationCode] = useState("");
    const location = useLocation();  // Get location to access passed state
    const navigate = useNavigate();  // In case you want to navigate the user after verification

    const username = location.state?.username || getUsernameFromUrl();  // Get username from state or fallback to empty string

    // Redirect if no username is available in state (meaning user didn't come from signup)
    useEffect(() => {
        if (!username) {
            navigate("/sign-up");  // Redirect to signup page if username is missing
        }
    }, [username, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page reload

        const verificationData = {
            username: username,  // Use the username from state
            code: verificationCode,
        };

        try {
            const response = await fetch('http://localhost:3000/api/users/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(verificationData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('User verified successfully');
                // Optionally, redirect to login page after successful verification
                navigate('/login');
            } else {
                alert('Error verifying user: ' + result.error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <>
            <h1 id="verify-title">Verify User</h1>
            <h2 id="verify-instructions">Please enter the verification code you received through email</h2>
            
            <form id="verify-form" onSubmit={handleSubmit}>
                <input 
                    id="verify-input" 
                    type="text" 
                    placeholder="Enter verification code" 
                    value={verificationCode} 
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                />
                <button id="verify-submit" type="submit">Submit</button>
            </form>
        </>
    );
}
