import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';

function AnimatedCircles() {
    const { data } = useWebSocket(); // Access WebSocket data

    // Get the first receiver value
    const receiverValue = data?.ReceiverValues[0] || 0;

    return (
        <div className="col-lg-6 col-lg-push-3 overflow-hidden push-20">
            <div className="circles push-50">
                {[...Array(7)].map((_, index) => (
                    <div key={index} className={`circle circle-${index} animated fadeIn`}>
                        <span></span>
                    </div>
                ))}
                <div className="animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="800">
                    <span className="circle circle-over-1">
                        <span data-toggle="countTo" data-to={receiverValue} data-speed="100000" className="text-success">{receiverValue}</span>
                    </span>
                    <span className="circle circle-over-2"></span>
                    <span className="circle circle-over-3"></span>
                </div>
                <span className="circle circles-main-content">
                    {/* <span data-toggle="countTo" data-to="16540" data-speed="60000"></span><br /> */}
                        <span data-toggle="countTo" data-to={receiverValue} data-speed="100000">{receiverValue}</span><br />
                    <span className="text-crystal">THROTTLE PERCENTAGE</span>
                </span>
            </div>
        </div>
    );
}

export default AnimatedCircles;