import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = { username, password };

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, user)
            .then(response => {
                alert("Registration successful! You can now log in.");
                setUsername('');
                setPassword('');
            })
            .catch(error => {
                console.error('There was an error registering the user!', error);
                alert("Registration failed!");
            });
    };

    return (
        <div>
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
