import { Component } from 'react'
import packStyle from '../../css/gameAppCss/gamePack.module.css'
import MessageHandler from '../../Server/eventHandler'

export default class GamePack extends Component {
    state = {
        packinfo: null,
        hide: "none",
        animation: ""
    }

    componentDidMount = () => {//加载完成调用
        MessageHandler.addListener("callPack", this.getPanelMsg)
        MessageHandler.emit("callbackLoadOK", { op: "comloadingOK", msg: "" })
    }

    componentWillUnmount = () => {//删除组件调用
        MessageHandler.removeListener("callPack", this.getPanelMsg)
    }

    getPanelMsg = (pmsg) => {
        switch (pmsg.op) {
            case "playerPack":
                console.log("接收GamePack资源")
                this.setState({
                    packinfo: pmsg.msg
                })
                break;
            case "show":
                if (this.state.hide === "block") {
                    this.hideBtn()
                } else {
                    this.setState({
                        hide: "block",
                        animation: "packShow 0.1s forwards ease"
                    })
                }
                break
            default:
                break;
        }
    }


    constructor() {
        super()
        console.log("GamePack组件加载")
    }

    hideBtn = () => {
        this.setState({ animation: "packHide 0.1s forwards ease" })
        setTimeout(() => { this.setState({ hide: "none" }) }, 100)
    }
    render() {
        return (
            <div className={packStyle.back} style={{ display: this.state.hide, animation: this.state.animation }}>
                <div className={packStyle.contextback}>
                    <p>背包</p>
                    <div className={packStyle.context}>
                        <ul className={packStyle.packul}>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            <li className={packStyle.lis}></li>
                            {
                                /* this.state.packinfo !== null &&
                                this.state.packinfo.map((item, index) => {
                                    return (
                                        <li key={index} className={packStyle.lis}></li>
                                    )
                                }) */
                            }
                        </ul>
                    </div>
                </div>
                <div className={packStyle.hideBtn} onClick={this.hideBtn}></div>
            </div>
        )
    }
}