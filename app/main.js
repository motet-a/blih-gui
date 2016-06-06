/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T17:39:11+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-06T20:29:37+02:00
* @License: MIT
*/

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var client = require('electron-connect').client;

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', function () {
  if (mainWindow === null)
    createWindow();
});
