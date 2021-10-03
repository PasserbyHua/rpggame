import { Component } from 'react'
import panelStyle from '../../css/gameAppCss/gamePanel.module.css'
import PlayerList from './gamePlayerList'
import CreatePlayer from './gameCreate'
import MessageHandler from '../../Server/eventHandler'

export default class GamePanel extends Component {
    state = {
        Hide: "block"
    }

    /* constructor(props){
        super(props)
    } */

    componentDidMount() {
        this.props.getSend(this.getParentMsg)
        MessageHandler.addListener("callbackPlayerList", this.callbackPlayerList)
        MessageHandler.addListener("callbackCreatePlayer", this.callbackCreatePlayer)
    }

    componentWillUnmount() {
        MessageHandler.removeListener("callbackPlayerList", this.callbackPlayerList)
        MessageHandler.removeListener("callbackCreatePlayer", this.callbackCreatePlayer)
    }

    callbackPlayerList = (msg) => {
        switch (msg.op) {
            case "confirmReceipt":
                //console.log("读取列表成功")
                break;
            case "exit":
                //console.log("退出游戏")
                this.callbackParent("exit", "null")
                break;
            case "create":
                const cmsg = { op: "create", msg: null }
                MessageHandler.emit("callCreatePlayer", cmsg)
                break;
            case "selectID":
                this.callbackParent("selectPlayer", msg.index)
                break;
            case "loadPlayerInfo":
                this.callbackParent("loadInfo", msg.msg)
                break;
            default:
                break;
        }
    }

    callbackCreatePlayer = (msg) => {
        switch (msg.op) {
            case "ok":
                this.callbackParent("createCharacter", msg.name)
                break;
            default:
                break;
        }
    }

    getParentMsg = (op, msg) => {
        switch (op) {
            case "PlayerList":
                const listMsg = { op: "playListRes", msg: msg }
                MessageHandler.emit("callPlayerList", listMsg)
                break;
            case "CreatePlayer":
                const createMsg = { op: "createRes", msg: msg }
                MessageHandler.emit("callCreatePlayer", createMsg)
                break;
            case "SelectPlayer":
                const selectMsg = { op: "selectRes", msg: msg }
                MessageHandler.emit("callPlayerList", selectMsg)
                break;
            default:
                break;
        }
    }

    callbackParent = (op, msg) => {
        this.props.callback(op, msg)
    }

    render() {
        return (
            <div className={panelStyle.back} style={{ display: this.state.Hide }}>
                <PlayerList />
                <CreatePlayer />
            </div>
        )
    }
}