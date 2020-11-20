// npm init -y
// npm install electron
// "start":"electron ."


// electron logic

const electron = require("electron");
const {app , BrowserWindow} = electron;


function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true // desktop appplication usme node enable
        }
      })
      win.loadFile('index.html').then(function(){
          win.maximize();
          win.webContents.openDevTools();
      });
}

app.whenReady().then(createWindow);









// os specific code
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
