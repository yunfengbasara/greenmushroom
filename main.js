const { app, BrowserWindow, ipcMain } = require('electron')
let exec = require('child_process').execFile;
let path = require('path');

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 540,
    resizable: false,
    transparent: true,
    frame: false,
    icon: 'assets/icons/mushroom.ico',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('ui/index.html')

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

ipcMain.on('window_event_close', () => {
  mainWindow.close();
})

ipcMain.on('create', (event, exepath, inipath) => {
  let args = [];
  args.push(exepath);
  args.push(inipath);
  exec("note.exe", args, function (err, data) {
    console.log(err);
    console.log(data);
  });
})