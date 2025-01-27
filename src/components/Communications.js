import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';

function Communications() {
    const { data } = useWebSocket(); // Access WebSocket data

    // Get motor values from WebSocket data
    const motorValues = data?.MotorValues || [0, 0, 0, 0]; // Default to an array of zeros if data is not available
    const [motor1, motor2, motor3, motor4] = motorValues; // Destructure motor values

    return (
        <div className="block">
            <div className="block-header overflow-hidden">
                <h2 className="block-title animated fadeInDown">MOTOR POWER 4 </h2>
            </div>
            <div className="block-content block-content-full overflow-hidden">
                <div className="font-w600 text-white-op push-5">MOTOR 1: {motor1}</div>
                <div className="progress">
                    <div className="progress-bar progress-bar-sf progress-bar-striped active" role="progressbar" aria-valuenow={motor1} aria-valuemin="0" aria-valuemax="100" style={{ width: `${motor1}%` }}></div>
                </div>
                <div className="font-w600 text-white-op push-5">MOTOR 2: {motor2}</div>
                <div className="progress">
                    <div className="progress-bar progress-bar-sf progress-bar-striped active" role="progressbar" aria-valuenow={motor2} aria-valuemin="0" aria-valuemax="100" style={{ width: `${motor2}%` }}></div>
                </div>
                <div className="font-w600 text-white-op push-5">MOTOR 3: {motor3}</div>
                <div className="progress">
                    <div className="progress-bar progress-bar-sf progress-bar-striped active" role="progressbar" aria-valuenow={motor3} aria-valuemin="0" aria-valuemax="100" style={{ width: `${motor3}%` }}></div>
                </div>
                <div className="font-w600 text-white-op push-5">MOTOR 4: +{motor4}</div>
                <div className="progress">
                    <div className="progress-bar progress-bar-sf progress-bar-striped active" role="progressbar" aria-valuenow={motor4} aria-valuemin="0" aria-valuemax="100" style={{ width: `${motor4}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default Communications;