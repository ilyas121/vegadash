const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const iconPath = path.join(__dirname, 'src/img/vegaforce-logo.png');
  console.log('Icon path:', iconPath);
  
  // Check if file exists
  const fs = require('fs');
  if (fs.existsSync(iconPath)) {
    console.log('Icon file exists');
  } else {
    console.log('Icon file not found');
  }

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Set the dock icon for macOS
  if (process.platform === 'darwin') {
    console.log('Setting dock icon for macOS');
    app.dock.setIcon(iconPath);
  }

  if (isDev) {
    console.log('Loading development URL');
    win.loadURL('http://localhost:8080');
    win.webContents.openDevTools();
  } else {
    console.log('Loading production file');
    win.loadFile('index.html');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
