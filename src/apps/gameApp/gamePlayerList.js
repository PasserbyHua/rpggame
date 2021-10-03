import { Component } from 'react'
import playerListStyle from '../../css/gameAppCss/gamePlayerList.module.css'
import MessageHandler from '../../Server/eventHandler'

export default class PlayerList extends Component {

    state = {
        Hide: "none",
        list: null
    }

    /* constructor(props) {
        super(props)
    } */

    componentDidMount = () => {
        MessageHandler.addListener("callPlayerList", this.getPanelMessage)
    }
    componentWillUnmount = () => {
        MessageHandler.removeListener("callPlayerList", this.getPanelMessage)
    }

    getPanelMessage = (msg) => {
        switch (msg.op) {
            case "playListRes":
                this.createList(msg.msg)
                const backMsg = { op: "confirmReceipt", msg: "OK" }
                MessageHandler.emit("callbackPlayerList", backMsg)
                break;
            case "selectRes":
                var loadMsg = { op: "loadPlayerInfo", msg: false }
                if (msg.msg.sOrF) {
                    this.setState({
                        Hide: "none"
                    })
                    loadMsg.msg = true
                }
                MessageHandler.emit("callbackPlayerList", loadMsg)
                break;
            default:
                break;
        }
    }

    createList = (list) => {
        if (list.length === 0) {
            this.setState({
                Hide: "block",
                list: null
            })
        } else {
            this.setState({
                Hide: "block",
                list: list
            })
        }
    }

    selectItem = (index) => {
        const backMsg = { op: "selectID", index: index }
        MessageHandler.emit("callbackPlayerList", backMsg)
    }

    createPlayer = () => {
        const backMsg = { op: "create", msg: "null" }
        MessageHandler.emit("callbackPlayerList", backMsg)
    }

    exit = () => {
        const backMsg = { op: "exit", msg: "null" }
        MessageHandler.emit("callbackPlayerList", backMsg)
    }

    render() {
        return (
            <div className={playerListStyle.back} style={{ display: this.state.Hide }}>
                <div className={playerListStyle.hideScroll}>
                    <ul>
                        {
                            this.state.list === null ?
                                <li className={playerListStyle.tip} onClick={this.createPlayer}>还没有角色，赶快创建一个吧</li> :
                                this.state.list.map(
                                    (item, index) => {
                                        return (
                                            <li key={index} className={item.IsBaned ? playerListStyle.ban : ""}>
                                                <div onClick={(e) => { item.IsBaned ? this.selectItem(-1) : this.selectItem(item.ID) }}>
                                                    <p style={{ textAlign: "left" }}>
                                                        <span className={playerListStyle.pid}>{item.ID}</span>
                                                        <span className={playerListStyle.name}>{item.IsBaned ? item.Name + "[封禁]" : item.Name}</span>
                                                        <span className={playerListStyle.level}>等级 {item.Level}</span>
                                                    </p>
                                                </div>
                                            </li>
                                        )
                                    }
                                )
                        }
                    </ul>
                </div>
                <div onClick={this.createPlayer} className={playerListStyle.menu}>
                    <span style={{ color: "#902500" }}>创建角色</span>
                </div>
                <div onClick={this.exit} className={playerListStyle.menu}>
                    <span style={{ color: "#A90D05" }}>退出游戏</span>
                </div>
            </div >
        )
    }
}