import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showCreateDropdown, setShowCreateDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCreateSelection = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'initiative') {
            navigate('/create/initiative');
        } else if (selectedValue === 'project') {
            navigate('/create/project');
        } else if (selectedValue === 'milestone') {
            navigate('/create/milestone');
        }
        setShowCreateDropdown(false);
    };

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Roadmap Tool</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <button 
                            className="btn" 
                            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                        >
                            Create
                        </button>
                        {showCreateDropdown && (
                            <div className="create-dropdown">
                                <select 
                                    onChange={handleCreateSelection} 
                                    defaultValue="" 
                                    className="browser-default"
                                >
                                    <option value="" disabled>Select an object to create</option>
                                    <option value="initiative">Initiative</option>
                                    <option value="project">Project</option>
                                    <option value="milestone">Milestone</option>
                                </select>
                            </div>
                        )}
                    </li>
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
