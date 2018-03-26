import * as PIXI from 'pixi.js'
import * as React from 'react'

interface IAppProps {}

export default class App extends React.Component<IAppProps> {
    canvas: HTMLCanvasElement | null
    constructor(props: IAppProps) {
        super(props)
    }
    render() {
        return <canvas ref={canvas => this.canvas = canvas}/>
    }
}
