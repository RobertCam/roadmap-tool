import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Roadmap Tool</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/timeline">Timeline</Link></li>
                    <li><Link to="/initiatives">Initiatives</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/milestones">Milestones</Link></li>                    
                    {user ? (
                        <>
                            <li><button onClick={handleLogout} className="btn-flat">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

