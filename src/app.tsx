// import * as PIXI from 'pixi.js'
import * as React from 'react'
import { ipcRenderer } from 'electron'
import { FieldOfView } from './fieldofview'

interface IAppProps {}

export default class App extends React.Component<IAppProps> {
    canvas: HTMLCanvasElement | null
    grid: number[][]
    fov: FieldOfView
    constructor(props: IAppProps) {
        super(props)
    }
    componentDidMount() {
        this.fov = new FieldOfView(0)
        ipcRenderer.on('generate', (event: any, arg: {message: string, grid: number[][]}) => {
            switch (arg.message) {
            case 'step':
                this.grid = arg.grid
                break
            case 'complete':
                this.renderMap()
                break
            }
        })

        ipcRenderer.send('generate', {
            options: {
                animate: false,
                animationDelay: 10,
                seed: '1234',
                roomAttempts: 200,
                width: 30,
                height: 30,
                wallWidth: 1,
                mazeWidth: 2
            }
        })
    }
    renderMap() {
        this.fov.UpdateFOV(this.grid)

        const ts = 30

        const tileGraphics = new PIXI.Graphics()
        tileGraphics.beginFill(0x000000)
        tileGraphics.drawRect(0, 0, ts, ts)
        tileGraphics.endFill()
    }
    render() {
        return <canvas ref={canvas => this.canvas = canvas}/>
    }
}
