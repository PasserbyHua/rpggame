import { Component } from 'react'
import setStyle from "../../css/gameAppCss/gameSet.module.css"
import MessageHandler from '../../Server/eventHandler'

export default class GameSet extends Component {
    state = {
        hide: "none",
        animation: ""
    }
    componentDidMount = () => {
        MessageHandler.addListener("callSet", this.getPanelMsg)
        MessageHandler.emit("callbackLoadOK", { op: "comloadingOK", msg: "" })
    }
    componentWillUnmount = () => {
        MessageHandler.removeListener("callSet", this.getPanelMsg)
    }

    getPanelMsg = (pmsg) => {
        switch (pmsg.op) {
            case "show":
                if (this.state.hide === "block") {
                    this.hideBtn()
                } else {
                    this.setState({
                        hide: "block",
                        animation: "setShow 0.1s forwards ease"
                    })
                }
                break
            default:
                break;
        }
    }
    constructor(){
        super()
        console.log("GameSet组件加载")
    }
    hideBtn = () => {
        this.setState({ animation: "setHide 0.1s forwards ease" })
        setTimeout(() => { this.setState({ hide: "none" }) }, 100)
    }
    render() {
        return (
            <div className={setStyle.back} style={{ display: this.state.hide, animation: this.state.animation }}>
                <div>设置</div>
                <div className={setStyle.hideBtn} onClick={this.hideBtn}></div>
            </div>
        )
    }
}