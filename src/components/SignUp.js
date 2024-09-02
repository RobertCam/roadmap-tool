import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = { username, password };

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, user)
            .then(response => {
                alert("Registration successful!");
                navigate('/login'); // Redirect to login after sign-up
            })
            .catch(error => {
                console.error('There was an error registering the user!', error);
                alert("Registration failed!");
            });
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
