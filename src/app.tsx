// import * as PIXI from 'pixi.js'
import * as React from 'react'
import { ipcRenderer } from 'electron'

interface IAppProps {}

export default class App extends React.Component<IAppProps> {
    canvas: HTMLCanvasElement | null
    constructor(props: IAppProps) {
        super(props)
    }
    componentDidMount() {
        ipcRenderer.on('generate', (event: any, arg: {message: string, grid: number[][]}) => {
            switch (arg.message) {
            case 'step':
                console.log(arg.grid)
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
    render() {
        return <canvas ref={canvas => this.canvas = canvas}/>
    }
}
