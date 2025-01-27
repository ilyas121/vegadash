import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';

function ReceiverValues() {
    const { data } = useWebSocket();
    const rawValues = data?.ReceiverValues || Array(6).fill(0);
    
    // Ensure all values are numbers
    const receiverValues = rawValues.map(val => typeof val === 'number' ? val : 0);
    
    const channels = [
        { name: 'THROTTLE', value: receiverValues[0] },
        { name: 'ROLL', value: receiverValues[1] },
        { name: 'PITCH', value: receiverValues[2] },
        { name: 'YAW', value: receiverValues[3] },
        { name: 'ARM', value: receiverValues[4] },
        { name: 'MODE', value: receiverValues[5] }
    ];

    return (
        <div className="block">
            <div className="block-header">
                <h2 className="block-title">RECEIVER VALUES</h2>
            </div>
            <div className="block-content">
                {channels.map((channel, index) => {
                    // Ensure value is a number and format it
                    const displayValue = Number(channel.value).toFixed(2);
                    const progressWidth = Math.min(Math.max((channel.value / 100) * 100, 0), 100);
                    
                    return (
                        <div key={index} className="push-10">
                            <div className="font-w600 text-white-op push-5">
                                {channel.name}
                                <span className="pull-right">{displayValue}</span>
                            </div>
                            <div className="progress">
                                <div 
                                    className="progress-bar progress-bar-sf" 
                                    role="progressbar" 
                                    style={{ width: `${progressWidth}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ReceiverValues; 