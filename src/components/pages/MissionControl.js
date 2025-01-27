import React from 'react';
import DroneModel from '../DroneModel';

function MissionControl() {
    return (
        <main id="page-main" className="modern-sf" style={{ 
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 150px)', // Adjust based on your header height
            overflow: 'hidden'
        }}>
            <div className="block" style={{ flex: 1, minHeight: 0 }}>
                <div className="block-header overflow-hidden">
                    <h2 className="block-title animated fadeInDown">DRONE MODEL</h2>
                </div>
                <div className="block-content" style={{ height: 'calc(100% - 50px)' }}>
                    <DroneModel />
                </div>
            </div>
        </main>
    );
}

export default MissionControl; 