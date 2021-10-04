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


    componentDidMount = () => {
        MessageHandler.addListener("callMenu", this.getPanelMsg)
        const menuMsg = { op: "comloadingOK", msg: "" }
        MessageHandler.emit("callbackMenu", menuMsg)
    }

    componentWillUnmount = () => {
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

    BtnClick = (e, item) => {
        console.log(e, item)
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
                                    <img src="./images/logo.png" alt={item.name} className={menuStyle.btnimg} />
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