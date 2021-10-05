import { Component } from 'react'
import attributeStyle from '../../css/gameAppCss/gameAttribute.module.css'
import MessageHandler from '../../Server/eventHandler'


export default class GameAttribute extends Component {
    state = {
        attributeInfo: "",
        hide: "none",
        animation: ""
    }
    componentDidMount = () => {//加载完成调用
        MessageHandler.addListener("callAttribute", this.getPanelMsg)
        MessageHandler.emit("callbackLoadOK", { op: "comloadingOK", msg: "" })
    }
    componentWillUnmount = () => {//删除组件调用
        MessageHandler.removeListener("callAttribute", this.getPanelMsg)
    }

    getPanelMsg = (pmsg) => {
        switch (pmsg.op) {
            case "playerAttribute":
                this.setState({
                    attributeStyle: pmsg.msg
                })
                break;
            case "show":
                if (this.state.hide === "block") {
                    this.hideBtn()
                } else {
                    this.setState({
                        hide: "block",
                        animation: "infoShow 0.1s forwards ease"
                    })
                }
                break
            default:
                break;
        }
    }

    constructor() {
        super()
        console.log("GameAttribute组件加载")
    }

    hideBtn = () => {
        this.setState({ animation: "infoHide 0.1s forwards ease" })
        setTimeout(() => { this.setState({ hide: "none" }) }, 100)
    }

    render() {
        return (
            <div className={attributeStyle.back} style={{ display: this.state.hide, animation: this.state.animation }}>
                <div>个人信息</div>
                <div className={attributeStyle.hideBtn} onClick={this.hideBtn}></div>
            </div>
        )
    }
}