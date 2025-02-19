import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const WebSocketContext = createContext({
    data: null,
    sendCommand: () => {},
    reconnect: () => {},
    isConnected: false
});

export function WebSocketProvider({ children }) {
    const [data, setData] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);

    const connect = useCallback(() => {
        ws.current = new WebSocket('ws://192.168.4.1:9090');
        
        ws.current.onmessage = (event) => {
            setData(JSON.parse(event.data));
        };
        
        ws.current.onopen = () => {
            console.log('WebSocket Connected');
            setIsConnected(true);
        };

        ws.current.onclose = () => {
            console.log('WebSocket Disconnected');
            setIsConnected(false);
        };

        ws.current.onerror = () => {
            console.log('WebSocket Error');
            setIsConnected(false);
        };
    }, []);

    const reconnect = useCallback(() => {
        console.log('Reconnecting WebSocket');
        if (ws.current) {
            ws.current.close();
        }
        connect();
    }, [connect]);

    useEffect(() => {
        connect();
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [connect]);

    const sendCommand = (command) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(command));
        }
    };

    return (
        <WebSocketContext.Provider value={{ data, sendCommand, reconnect, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
}

export const useWebSocket = () => useContext(WebSocketContext); 