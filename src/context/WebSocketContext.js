import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:9090'); // Connect to your WebSocket server

        socket.onopen = () => {
            console.log('WebSocket connection established');
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setData(parsedData);
        };

        socket.onerror = (event) => {
            console.error('WebSocket error:', event);
            setError(event);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            setIsConnected(false);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ data, error, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
}; 