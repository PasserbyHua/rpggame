import { Component } from 'react'
import menuStyle from '../../css/gameAppCss/gameMenu.module.css'
import menuInfo from './menu.json'
import MessageHandler from '../../Server/eventHandler'

export default class GameMenu extends Component {
    state = {
        Hide: "",
        isHide: false,
        hidebtnstyle: ""
    }


    componentDidMount = () => {//加载完成调用
        MessageHandler.addListener("callMenu", this.getPanelMsg)
        MessageHandler.emit("callbackLoadOK", { op: "comloadingOK", msg: "" })
    }

    componentWillUnmount = () => {//删除组件调用
        MessageHandler.removeListener("callMenu", this.getPanelMsg)
    }
    getPanelMsg = (pmsg) => {
        switch (pmsg.op) {
            default:
                break;
        }
    }

    constructor() {
        super()
        console.log("GameMenu组件加载")
    }

    BtnClick = (e, item) => {//菜单按钮
        switch (item.name) {
            case "set":
                MessageHandler.emit("callbackMenu", { op: "showSet" })
                break;
            case "info":
                MessageHandler.emit("callbackMenu", { op: "showAttribule" })
                break;
            case "pack":
                MessageHandler.emit("callbackMenu", { op: "showPack" })
                break;
            default:
                break;
        }
    }

    hide = () => {
        if (this.state.isHide) {
            this.setState({
                Hide: "menushow 0.5s forwards",
                isHide: false,
                hidebtnstyle: "rotate(0deg)"
            })
        } else {
            this.setState({
                Hide: "menuhide 0.5s forwards",
                isHide: true,
                hidebtnstyle: "rotate(180deg)"
            })
        }
    }
    render() {
        return (
            <div className={menuStyle.back}>
                <ul className={menuStyle.MenuUL} style={{ animation: this.state.Hide }}>
                    {menuInfo.map(
                        (item, index) => {
                            return (
                                <li key={index} className={menuStyle.item} onClick={(e) => { this.BtnClick(e, item) }}>
                                    <img src={item.img} alt={item.name} className={menuStyle.btnimg} />
                                    <p className={menuStyle.btnp}>{item.text}</p>
                                </li>
                            )
                        }
                    )}
                </ul>
                <div className={menuStyle.hidebtn} onClick={this.hide} style={{ transform: this.state.hidebtnstyle }}></div>
            </div>
        )
    }
}