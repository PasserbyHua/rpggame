import { Component } from 'react'
import panelStyle from '../../css/gameAppCss/gamePanel.module.css'
import PlayerList from './gamePlayerList'
import CreatePlayer from './gameCreate'
import GameMenu from './gameMenu'
import GameAttribute from './gameAttribute'
import GamePack from './gamePack'
import GameSet from './gameSet'
import GameHeadMenu from './gameHeadMenu'
import MessageHandler from '../../Server/eventHandler'

export default class GamePanel extends Component {
    state = {
        LoadUI: false
    }

    constructor(props) {
        super(props)
        console.log("GamePanel组件加载")
    }

    componentDidMount() {//完成渲染调用
        this.props.getSend(this.getParentMsg)
        MessageHandler.addListener("callbackLoadOK", this.callbackLoadOK)
        MessageHandler.addListener("callbackPlayerList", this.callbackPlayerList)
        MessageHandler.addListener("callbackCreatePlayer", this.callbackCreatePlayer)
        MessageHandler.addListener("callbackMenu", this.callbackmenu)
        MessageHandler.addListener("callbackAttribute", this.callbackAttribute)
        MessageHandler.addListener("callbackPack", this.callbackPack)
        MessageHandler.addListener("callbackSet", this.callbackSet)
        MessageHandler.addListener("callbackHeadMenu", this.callbackHeadMenu)
    }

    componentWillUnmount() {//移除组件调用 
        MessageHandler.removeListener("callbackLoadOK", this.callbackLoadOK)
        MessageHandler.removeListener("callbackPlayerList", this.callbackPlayerList)
        MessageHandler.removeListener("callbackCreatePlayer", this.callbackCreatePlayer)
        MessageHandler.removeListener("callbackMenu", this.callbackmenu)
        MessageHandler.removeListener("callbackAttribute", this.callbackAttribute)
        MessageHandler.removeListener("callbackPack", this.callbackPack)
        MessageHandler.removeListener("callbackSet", this.callbackSet)
        MessageHandler.removeListener("callbackHeadMenu", this.callbackHeadMenu)
    }

    callbackPlayerList = (msg) => {//角色列表组件回调
        switch (msg.op) {
            case "create":
                MessageHandler.emit("callCreatePlayer", { op: "create", msg: null })
                break;
            case "exit":
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

    callbackCreatePlayer = (msg) => {//创建角色-回调
        switch (msg.op) {
            case "createInfo":
                this.callbackParent("createCharacter", msg.name)
                break;
            default:
                break;
        }
    }

    callbackLoadOK = (msg) => {//组件加载消息
        switch (msg.op) {
            case "comloadingOK":
                this.callbackParent(msg.op, msg.msg)
                break;
            default:
                break;
        }
    }

    callbackmenu = (msg) => {//菜单回复
        //console.log(msg)
        switch (msg.op) {
            case "showAttribule":
                MessageHandler.emit("callAttribute", { op: "show", msg: "" })
                break
            case "showPack":
                MessageHandler.emit("callPack", { op: "show", msg: "" })
                break
            case "showSet":
                MessageHandler.emit("callSet", { op: "show", msg: "" })
                break
            default:
                break;
        }
    }

    callbackAttribute = (msg) => {//个人信息界面回复
        switch (msg.op) {
            default:
                break;
        }
    }

    callbackPack = (msg) => {//背包界面回复
        switch (msg.op) {
            default:
                break;
        }
    }

    callbackSet = (msg) => {//设置界面回复
        switch (msg.op) {
            default:
                break;
        }
    }

    callbackHeadMenu = (msg) => {//头像菜单回复
        switch (msg.op) {
            default:
                break;
        }
    }

    getParentMsg = (op, msg) => {//parent消息接收
        switch (op) {
            case "RunLoad":
                this.setState({ LoadUI: true })
                break;
            case "PlayerList":
                MessageHandler.emit("callPlayerList", { op: "playListRes", msg: msg })
                break;
            case "CreatePlayer":
                MessageHandler.emit("callCreatePlayer", { op: "createRes", msg: msg })
                break;
            case "SelectPlayer":
                MessageHandler.emit("callPlayerList", { op: "selectRes", msg: msg })
                break;
            case "playerInfo":
                MessageHandler.emit("callHeadMenu", { op: "playerInfo", msg: msg })
                break
            case "playerAttribute":
                MessageHandler.emit("callAttribute", { op: "playerAttribute", msg: msg })
                break
            case "playerPack":
                MessageHandler.emit("callPack", { op: "playerPack", msg: msg })
                break
            default:
                break;
        }
    }

    callbackParent = (op, msg) => {//发送父组件消息
        this.props.callback(op, msg)
    }
    render() {
        return (
            <div className={panelStyle.back}>
                <PlayerList />
                <CreatePlayer />
                {this.state.LoadUI && <GameMenu />}
                {this.state.LoadUI && <GameAttribute />}
                {this.state.LoadUI && <GamePack />}
                {this.state.LoadUI && <GameSet />}
                {this.state.LoadUI && <GameHeadMenu />}
            </div>
        )
    }
}