import { Component } from 'react'
import errorStyle from './errorStyle.module.css'

export default class Error extends Component {
    constructor(){
        window.location.href="http://"+window.location.host+"/Error/404.html"
    }
    render() {
        return (
            <div className={errorStyle.errorRoot}>
                <h1>404,页面未找到</h1>
            </div>
        )
    }
}