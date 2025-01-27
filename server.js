const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9090 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Function to generate random double values
    const generateRandomDoubles = (count) => {
        return Array.from({ length: count }, () => (Math.random() * 100).toFixed(2)); // Random doubles between 0 and 100
    };

    // Function to send data to the client
    const sendData = () => {
        const data = {
            IMU: generateRandomDoubles(9), // 9 doubles for IMU
            ReceiverValues: generateRandomDoubles(6), // 6 doubles for Receiver Values
            MotorValues: generateRandomDoubles(4), // 4 doubles for Motor Values
            PIDGains: generateRandomDoubles(9), // 9 doubles for PID Gains
            PIDOutput: generateRandomDoubles(3), // 3 doubles for PID Output
            Setpoints: generateRandomDoubles(3), // 3 doubles for Setpoints
            BatteryLife: (Math.random() * 100).toFixed(2), // 1 double for Battery Life
        };

        ws.send(JSON.stringify(data));
    };

    // Send data every second
    const intervalId = setInterval(sendData, 100);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId); // Clear the interval when the client disconnects
    });
});

console.log('WebSocket server is running on ws://localhost:9090'); 