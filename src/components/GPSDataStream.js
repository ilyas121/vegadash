import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';

function ControlStream() {
    const { data } = useWebSocket();
    
    // Destructure PID data from WebSocket
    const pidOutput = data?.PIDOutput || [0, 0, 0];
    const setpoints = data?.Setpoints || [0, 0, 0];
    const [roll, pitch, yaw] = pidOutput;
    const [rollSet, pitchSet, yawSet] = setpoints;

    return (
        <div className="block">
            <div className="block-header overflow-hidden">
                <h2 className="block-title animated fadeInDown">PID CONTROL</h2>
            </div>
            <div className="block-content">
                <div className="row items-push">
                    {/* PID Outputs */}
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="100">
                        <div className="font-s12 text-white-op">Roll OUTPUT</div>
                        <div className="font-s18 text-success">{roll || '0.00'}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="300">
                        <div className="font-s12 text-white-op">Pitch OUTPUT</div>
                        <div className="font-s18 text-success">{pitch || '0.00'}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="500">
                        <div className="font-s12 text-white-op">Yaw OUTPUT</div>
                        <div className="font-s18 text-success">{yaw || '0.00'}</div>
                    </div>
                    
                    {/* Setpoints */}
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="700">
                        <div className="font-s12 text-white-op">Roll SETPOINT</div>
                        <div className="font-s18 text-success">{rollSet || '0.00'}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="900">
                        <div className="font-s12 text-white-op">Pitch SETPOINT</div>
                        <div className="font-s18 text-success">{pitchSet || '0.00'}</div>
                    </div>
                    <div className="col-xs-4 animated fadeIn" data-toggle="appear" data-class="animated fadeIn" data-timeout="1100">
                        <div className="font-s12 text-white-op">Yaw SETPOINT</div>
                        <div className="font-s18 text-success">{yawSet || '0.00'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlStream;