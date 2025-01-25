const { app, BrowserWindow } = require("electron");
const path = require("path");

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the window in fullscreen
  mainWindow.setFullScreen(true);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
