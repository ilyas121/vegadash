document.addEventListener("DOMContentLoaded", () => {
    telemetryAPI.connectToDrone("ws://192.168.4.1/ws", (data) => {
      // document.getElementById("receiver").innerText = JSON.stringify(data.receiver, null, 2);
      // document.getElementById("imu").innerText = JSON.stringify(data.imu, null, 2);
      // document.getElementById("pid").innerText = JSON.stringify(data.pid, null, 2);
      // document.getElementById("motors").innerText = JSON.stringify(data.motors, null, 2);

      document.getElementById("ROLL").innerText = JSON.stringify(data.imu[0], null, 2);
      document.getElementById("PITCH").innerText = JSON.stringify(data.imu[1], null, 2);
      document.getElementById("YAW").innerText = JSON.stringify(data.imu[2], null, 2);
      document.getElementById("ROLLVEL").innerText = JSON.stringify(data.imu[3], null, 2);
      document.getElementById("PITCHVEL").innerText = JSON.stringify(data.imu[4], null, 2);
      document.getElementById("YAWVEL").innerText = JSON.stringify(data.imu[5], null, 2);
    });
  });
