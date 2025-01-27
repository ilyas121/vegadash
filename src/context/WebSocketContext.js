import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const WebSocketContext = createContext({
    data: null,
    sendCommand: () => {}
});

export const WebSocketProvider = ({ children }) => {
    const ws = useRef(null);
    const [data, setData] = useState(null);

    const sendCommand = (command) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(command));
        }
    };

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:9090');

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setData(data);
            } catch (error) {
                console.error('WebSocket message error:', error);
            }
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ data, sendCommand }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext); 