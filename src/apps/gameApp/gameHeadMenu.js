import { Component } from 'react'
import headMenuStyle from '../../css/gameAppCss/gameHeadMenu.module.css'
import MessageHandler from '../../Server/eventHandler'
import headID from "./headID.json"



export default class GameHeadMenu extends Component {
    state = {
        Hide: "",
        isHide: false,
        hideBtnStyle: "rotate(-180deg)",
        playerInfo: null
    }

    constructor() {
        super()
        console.log("GameHeadMenu组件加载")
    }

    componentDidMount = () => {
        MessageHandler.addListener("callHeadMenu", this.getPanelMsg)
        MessageHandler.emit("callbackLoadOK", { op: "comloadingOK", msg: "" })
    }

    componentWillUnmount = () => {
        MessageHandler.removeListener("callHeadMenu", this.getPanelMsg)
    }

    getPanelMsg = (pmsg) => {
        switch (pmsg.op) {
            case "playerInfo":
                this.setState({ playerInfo: pmsg.msg })
                break
            default:
                break;
        }
    }

    hide = () => {
        if (this.state.isHide) {
            this.setState({
                Hide: "headShow 0.5s forwards",
                isHide: false,
                hideBtnStyle: "rotate(-180deg)"
            })
        } else {
            this.setState({
                Hide: "headHide 0.5s forwards",
                isHide: true,
                hideBtnStyle: "rotate(0deg)"
            })
        }
    }

    render() {
        return (
            <div className={headMenuStyle.back}>
                <div className={headMenuStyle.menu} style={{ animation: this.state.Hide }}>
                    <img src={this.state.playerInfo === null ? headID[0] : headID[this.state.playerInfo.AvatarID]} alt="head" />
                    <span className={headMenuStyle.name}>{this.state.playerInfo === null ? "加载中" : this.state.playerInfo.Name}</span>
                </div>
                <div className={headMenuStyle.hidebtn} onClick={this.hide} style={{ transform: this.state.hideBtnStyle }}></div>
            </div>
        )
    }
}