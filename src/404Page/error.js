import { Component } from 'react'
import errorStyle from './errorStyle.module.css'

export default class Error extends Component {

    componentDidMount() {
        window.location.href="http://localhost:3000/Error/404.html";
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div className={errorStyle.errorRoot}>
                <h1>404,页面未找到</h1>
            </div>
        )
    }
}