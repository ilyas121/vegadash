import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWebSocket } from '../../context/WebSocketContext';

function PIDGraph({ axis, pidValue, setpointValue }) {
    const { data, sendCommand } = useWebSocket();
    const [graphData, setGraphData] = useState([]);
    const [gains, setGains] = useState({ p: 0, i: 0, d: 0 });
    const [tempGains, setTempGains] = useState({ p: 0, i: 0, d: 0 });

    // Get current PID gains from WebSocket data
    useEffect(() => {
        if (data?.PIDGains && !tempGains.p && !tempGains.i && !tempGains.d) {
            const gainIndex = { 'roll': 0, 'pitch': 3, 'yaw': 6 }[axis.toLowerCase()];
            if (gainIndex !== undefined) {
                const currentGains = {
                    p: data.PIDGains[gainIndex],
                    i: data.PIDGains[gainIndex + 1],
                    d: data.PIDGains[gainIndex + 2]
                };
                setGains(currentGains);
                setTempGains(currentGains);
            }
        }
    }, [data?.PIDGains, axis]);

    useEffect(() => {
        // Keep last 50 data points
        setGraphData(prevData => {
            const newData = [...prevData, {
                time: new Date().getTime(),
                pid: parseFloat(pidValue) || 0,
                setpoint: parseFloat(setpointValue) || 0
            }];
            
            if (newData.length > 50) {
                return newData.slice(-50);
            }
            return newData;
        });
    }, [pidValue, setpointValue]);

    const handleGainChange = (type, value) => {
        setTempGains(prev => ({
            ...prev,
            [type]: parseFloat(value) || 0
        }));
    };

    const handleSubmit = () => {
        setGains(tempGains);
        sendCommand({
            type: 'UPDATE_PID',
            axis: axis.toLowerCase(),
            gains: tempGains
        });
    };

    // Function to display current gain values or N/A
    const displayGainValue = (type) => {
        if (!data) return 'N/A';
        return gains[type].toFixed(2);
    };

    return (
        <div className="block">
            <div className="block-header overflow-hidden">
                <h2 className="block-title animated fadeInDown">{axis.toUpperCase()} PID CONTROL</h2>
            </div>
            <div className="block-content">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="time" 
                            domain={['auto', 'auto']}
                            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                        />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip 
                            labelFormatter={(time) => new Date(time).toLocaleTimeString()}
                        />
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="pid" 
                            stroke="#82ca9d" 
                            name="PID Output" 
                            dot={false}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="setpoint" 
                            stroke="#8884d8" 
                            name="Setpoint" 
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>

                <div className="row push-15-t">
                    <div className="col-xs-4">
                        <label className="text-white-op">P Gain <span className="text-success">({displayGainValue('p')})</span></label>
                        <input 
                            type="number" 
                            className="form-control input-sm"
                            value={tempGains.p}
                            onChange={(e) => handleGainChange('p', e.target.value)}
                            step="0.1"
                            min="0"
                        />
                    </div>
                    <div className="col-xs-4">
                        <label className="text-white-op">I Gain <span className="text-success">({displayGainValue('i')})</span></label>
                        <input 
                            type="number"
                            className="form-control input-sm"
                            value={tempGains.i}
                            onChange={(e) => handleGainChange('i', e.target.value)}
                            step="0.1"
                            min="0"
                        />
                    </div>
                    <div className="col-xs-4">
                        <label className="text-white-op">D Gain <span className="text-success">({displayGainValue('d')})</span></label>
                        <input 
                            type="number"
                            className="form-control input-sm"
                            value={tempGains.d}
                            onChange={(e) => handleGainChange('d', e.target.value)}
                            step="0.1"
                            min="0"
                        />
                    </div>
                </div>
                <div className="row push-15-t">
                    <div className="col-xs-12 text-center">
                        <button 
                            className="btn btn-sm btn-success"
                            onClick={handleSubmit}
                        >
                            Update {axis} PID Gains
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PIDGraph; 