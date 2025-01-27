import React from 'react';
import DroneModel from '../DroneModel';
import IMUData from '../IMUData';

function MissionControl() {
    return (
        <main className="modern-sf" style={{ 
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 250px)',
            overflow: 'hidden',
            marginBottom: '100px'
        }}>
            <div className="row" style={{ flex: 1, margin: 0, minHeight: 0 }}>
                {/* Left side - Drone Model */}
                <div className="col-md-9" style={{ height: '100%', paddingLeft: 0 }}>
                    <div className="block" style={{ height: '100%' }}>
                        <div className="block-header overflow-hidden">
                            <h2 className="block-title animated fadeInDown">DRONE MODEL</h2>
                        </div>
                        <div className="block-content" style={{ 
                            height: 'calc(100% - 51px)',
                            position: 'relative'
                        }}>
                            <DroneModel />
                        </div>
                    </div>
                </div>
                
                {/* Right side - IMU Data */}
                <div className="col-md-3" style={{ height: '100%', paddingRight: 0 }}>
                    <IMUData />
                </div>
            </div>
        </main>
    );
}

export default MissionControl; 