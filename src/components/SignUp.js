import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, { username, password });
            if (response.status === 201) {
                // Automatically log in the user after successful sign-up
                const loginResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { username, password });
                login(loginResponse.data.access_token);
                navigate('/timeline');  // Redirect to timeline or desired page
            }
        } catch (error) {
            console.error('There was an error signing up!', error);
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
