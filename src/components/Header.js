import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const { reconnect, isConnected } = useWebSocket();

    const handleTitleClick = () => {
        reconnect();
        navigate('/');
    };

    return (
        <header id="page-header">
            <div className="h3 text-right pull-right hidden-xs">
                <div className="text-crystal font-w300">RED_SNOWGOOSE_1</div>
                <div className={`${isConnected ? 'text-success' : 'text-danger'} animated infinite pulse pull-right`}>
                    [{isConnected ? 'LIVE' : 'DEAD'}]
                </div>
            </div>
            <h1 className="h3 font-w200">
                <span className="text-crystal">//</span> <a className="link-sf font-w300" onClick={handleTitleClick} href="#">ESP_COP_DASHBOARD</a>
            </h1>
        </header>
    );
}

export default Header;