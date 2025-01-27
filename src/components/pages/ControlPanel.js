import React from 'react';
import { useWebSocket } from '../../context/WebSocketContext';
import PIDGraph from '../graphs/PIDGraph';

function ControlPanel() {
    const { data } = useWebSocket();
    
    return (
        <main id="page-main" className="modern-sf">
            <div className="row">
                <div className="col-md-4">
                    <PIDGraph 
                        axis="Roll" 
                        pidValue={data?.PIDOutput?.[0]} 
                        setpointValue={data?.Setpoints?.[0]}
                    />
                </div>
                <div className="col-md-4">
                    <PIDGraph 
                        axis="Pitch" 
                        pidValue={data?.PIDOutput?.[1]} 
                        setpointValue={data?.Setpoints?.[1]}
                    />
                </div>
                <div className="col-md-4">
                    <PIDGraph 
                        axis="Yaw" 
                        pidValue={data?.PIDOutput?.[2]} 
                        setpointValue={data?.Setpoints?.[2]}
                    />
                </div>
            </div>
        </main>
    );
}

export default ControlPanel; 