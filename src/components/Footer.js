import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        switch(path) {
            case 'HOMEPAGE':
                navigate('/');
                break;
            case 'CONTROL PANEL':
                navigate('/control');
                break;
            case 'MISSION CONTROL':
                navigate('/mission');
                break;
            case 'FLASH DRONE':
                // TODO: Implement flash drone route
                break;
            default:
                navigate('/');
        }
    };

    return (
        <div>
            <div className="row navigation-tabs">
                {['HOMEPAGE', 'CONTROL PANEL', 'FLASH DRONE', 'MISSION CONTROL'].map((label) => (
                    <div className="col-xs-3" key={label}>
                        <button 
                            className="btn btn-xl btn-block btn-sf"
                            onClick={() => handleNavigation(label)}
                        >
                            {label}
                        </button>
                    </div>
                ))}
            </div>
            {/* <div className="block">
                <div className="block-content block-content-full font-s12 text-center" data-toggle="appear" data-class="animated fadeIn" data-timeout="1000">
                </div>
            </div> */}
        </div>
    );
}

export default Footer;