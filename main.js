const { app, BrowserWindow } = require('electron');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');


function createWindow() {

    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            contextIsolation: true,
        }
    });

    const checkServer = () => {
        http.get('http://localhost:3000', () => {
            win.loadURL('http://localhost:3000');
        }).on('error', () => {
            setTimeout(checkServer, 300);
        });
    };

    const server = spawn('npm', ['start'], {
        shell: true,
        stdio: 'inherit'
    });

    checkServer();
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});