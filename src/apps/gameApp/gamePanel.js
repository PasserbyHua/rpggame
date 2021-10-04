import { Component } from 'react'
import panelStyle from '../../css/gameAppCss/gamePanel.module.css'
import PlayerList from './gamePlayerList'
import CreatePlayer from './gameCreate'
import GameMenu from './gameMenu'
import MessageHandler from '../../Server/eventHandler'

export default class GamePanel extends Component {
    state = {
        Hide: "block",
        LoadUI: false
    }

    constructor(props) {
        super(props)
        console.log("GamePanel组件加载")
    }

    componentDidMount() {//完成渲染调用
        this.props.getSend(this.getParentMsg)
        MessageHandler.addListener("callbackPlayerList", this.callbackPlayerList)
        MessageHandler.addListener("callbackCreatePlayer", this.callbackCreatePlayer)
        MessageHandler.addListener("callbackMenu", this.callbackmenu)
    }

    componentWillUnmount() {//移除组件调用 
        MessageHandler.removeListener("callbackPlayerList", this.callbackPlayerList)
        MessageHandler.removeListener("callbackCreatePlayer", this.callbackCreatePlayer)
        MessageHandler.removeListener("callBackMenu", this.callbackmenu)
    }

    callbackPlayerList = (msg) => {//游戏列表组件回调
        switch (msg.op) {
            case "create"://打开角色创建
                const cmsg = { op: "create", msg: null }
                MessageHandler.emit("callCreatePlayer", cmsg)
                break;
            case "confirmReceipt":
                //console.log("读取列表成功")
                break;
            case "exit":
                console.log("退出游戏")
                this.callbackParent("exit", "null")
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

    callbackCreatePlayer = (msg) => {//创建角色回调
        switch (msg.op) {
            case "ok":
                this.callbackParent("createCharacter", msg.name)
                break;
            default:
                break;
        }
    }

    callbackmenu = (msg) => {//菜单回复
        //console.log(msg)
        switch (msg.op) {
            case "comloadingOK":
                this.callbackParent(msg.op, msg.msg)
                break;
            default:
                break;
        }
    }

    getParentMsg = (op, msg) => {//父组件消息接收
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
            case "RunLoad":
                this.setState({
                    LoadUI: true
                })
                break;
            default:
                break;
        }
    }

    callbackParent = (op, msg) => {//发送父组件消息
        this.props.callback(op, msg)
    }
    render() {
        return (
            <div className={panelStyle.back} style={{ display: this.state.Hide }}>
                <PlayerList />
                <CreatePlayer />
                {this.state.LoadUI && <GameMenu />}
            </div>
        )
    }
}