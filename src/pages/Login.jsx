import React from 'react';
import { auth, googleProvider, appleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import FluidBackground from '../components/FluidBackground';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("User signed in: ", result.user);
            navigate('/');
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            alert("Failed to sign in. Please check your connection and try again.");
        }
    };

    const handleAppleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, appleProvider);
            console.log("User signed in with Apple: ", result.user);
            navigate('/');
        } catch (error) {
            console.error("Error signing in with Apple: ", error);
            alert("Failed to sign in with Apple. Please check your connection and try again.");
        }
    };

    return (
        <div className="login-container">
            <FluidBackground />
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p>Sign in to continue to the platform</p>
                <button className="auth-btn google-btn" onClick={handleGoogleSignIn}>
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google logo"
                        className="auth-icon"
                    />
                    <span>Sign in with Google</span>
                </button>
                <button className="auth-btn apple-btn" onClick={handleAppleSignIn}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg"
                        alt="Apple logo"
                        className="auth-icon"
                    />
                    <span>Sign in with Apple</span>
                </button>
            </div>
        </div>
    );
};

export default Login;
