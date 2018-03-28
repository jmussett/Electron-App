declare var __dirname: string

import { app, BrowserWindow, ipcMain } from 'electron'
import { LevelGenerator } from './levelgenerator'

let mainWindow: Electron.BrowserWindow

function onReady() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })

    const fileName = `file://${__dirname}/index.html`
    mainWindow.loadURL(fileName)
    mainWindow.on('close', app.quit)
}

app.on('ready', onReady)
app.on('window-all-closed', app.quit)

ipcMain.on('generate', (e: any, msg: any) => {
    let lg = new LevelGenerator(msg.options)
    lg.Generate((grid: number[][]) => {
        e.sender.send('generate', {
            message: 'step',
            grid: grid
        })
    })

    e.sender.send('generate', {
        message: 'complete'
    })
})

console.log(`Electron Version ${app.getVersion()}`)
