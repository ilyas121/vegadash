const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9090 });

// Store PID gains for each axis
const pidGains = {
    roll: { p: 0, i: 0, d: 0 },
    pitch: { p: 0, i: 0, d: 0 },
    yaw: { p: 0, i: 0, d: 0 }
};

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Function to generate random double values
    const generateRandomDoubles = (count) => {
        return Array.from({ length: count }, () => (Math.random() * 100).toFixed(2));
    };

    // Function to send data to the client
    const sendData = () => {
        const data = {
            IMU: generateRandomDoubles(9),
            ReceiverValues: generateRandomDoubles(6),
            MotorValues: generateRandomDoubles(4),
            // Use stored PID gains instead of random values
            PIDGains: [
                ...Object.values(pidGains.roll),
                ...Object.values(pidGains.pitch),
                ...Object.values(pidGains.yaw)
            ],
            PIDOutput: generateRandomDoubles(3),
            Setpoints: generateRandomDoubles(3),
            BatteryLife: (Math.random() * 100).toFixed(2),
        };

        ws.send(JSON.stringify(data));
    };

    // Handle incoming messages
    ws.on('message', (message) => {
        try {
            const command = JSON.parse(message);
            
            if (command.type === 'UPDATE_PID') {
                const { axis, gains } = command;
                if (pidGains[axis]) {
                    pidGains[axis] = gains;
                    console.log(`Updated ${axis} PID gains:`, gains);
                }
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    // Send data every 100ms
    const intervalId = setInterval(sendData, 100);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId);
    });
});

console.log('WebSocket server is running on ws://localhost:9090'); 