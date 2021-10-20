import { Component } from 'react'
import activateStyle from '../css/activate.module.css'


export default class Activate extends Component{
    componentDidMount=()=>{
        console.log("激活信息："+this.props.match.params.msg)
    }

    render(){
        return(
            <div className={activateStyle.back}>
                <h1>正在激活中....</h1>
            </div>
        )
    }
}