import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const location = useLocation();

    return (
        <nav className="modern-sf">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/" className="text-crystal">
                        <span className="text-crystal">//</span> Dashboard
                    </Link>
                </li>
                <li className={location.pathname === '/control' ? 'active' : ''}>
                    <Link to="/control" className="text-crystal">
                        <span className="text-crystal">//</span> Control Panel
                    </Link>
                </li>
                <li className={location.pathname === '/mission' ? 'active' : ''}>
                    <Link to="/mission" className="text-crystal">
                        <span className="text-crystal">//</span> Mission Control
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation; 