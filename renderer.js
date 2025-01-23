document.addEventListener("DOMContentLoaded", () => {
    telemetryAPI.connectToDrone("ws://192.168.4.1/ws", (data) => {
      document.getElementById("receiver").innerText = JSON.stringify(data.receiver, null, 2);
      document.getElementById("imu").innerText = JSON.stringify(data.imu, null, 2);
      document.getElementById("pid").innerText = JSON.stringify(data.pid, null, 2);
      document.getElementById("motors").innerText = JSON.stringify(data.motors, null, 2);
    });
  });
