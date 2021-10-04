import { Component } from 'react'
import '../css/rpgGame.css'
import MyWebSocket from '../Server/serverHelper'
import JsonHelper from '../Server/jsonHelper'
import GamePanel from './gameApp/gamePanel'
import GameTip from './gameApp/gameTip'
import ServerAPI from "../Server/config.json"


var token = ""
var serverSocket = null
var jsonHelp = null
var GameLoadInfoCount = 3


export default class RPGGame extends Component {
    constructor() {
        super()
        console.log("RPGGame组件加载")
        GameLoadInfoCount = 3
        document.getElementsByTagName("title")[0].innerText = 'RPGGame'
        document.getElementsByClassName("titleLogo")[0].classList.add("titleLogoMin")
    }
    componentDidMount() {//渲染完成调用
        this.sendGameTip(0, "正在连接服务器...", "")
        try {
            token = this.props.location.state.token
        } catch {
            //console.log("无效登录")
            this.props.history.push("/")
        }
        //console.log("即将连接服务器")
        serverSocket = new MyWebSocket(ServerAPI.serverWSip + "/ws/RPGGameBar?access_token=" + token, this.refreshWindow)
        jsonHelp = new JsonHelper()
        try {
            serverSocket.connection()
        } catch (e) {
            console.log(e.message)
        }
        var disable = document.getElementsByClassName("gameRoot")[0]
        disable.oncontextmenu = function (e) {/*屏蔽浏览器默认右键事件*/
            e = e || window.event
            return false
        };
    }

    refreshWindow = (appId, serverMsg) => {//服务器返回数据
        //console.log("viewmsg" + serverMsg)
        switch (appId) {
            case "LoginStatus":
                if (serverMsg === "OK") {
                    //console.log("获取列表")
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson("CharacterList", ""))
                } else if (serverMsg === "error") {
                    this.sendGameTip(1, "连接服务器失败！请刷新页面后重试", "LoginStatus")
                }
                break;
            case "PlayerList":
                this.sendGamePanel("PlayerList", serverMsg)
                this.sendGameTip(-1, "null", "PlayerList")
                break;
            case "CreatePlayerResult":
                serverSocket.sendMessage(jsonHelp.createWsmessageJson("CharacterList", ""))
                this.sendGamePanel("CreatePlayer", serverMsg)
                break
            case "SelectPlayerResult":
                this.sendGamePanel("SelectPlayer", serverMsg)
                break
            case "Attribute":
                this.loadGameInfoOK("Attribute")
                break
            case "Backpack":
                this.loadGameInfoOK("Backpack")
                break
            case "SocketError":
                switch (serverMsg) {
                    case "ShutDown":
                        this.sendGameTip(1, "网络连接中断，请重新登录", "socketError")
                        break;
                    default:
                        break;
                }
                break
            default:
                break;
        }
    }

    callbackGamePanel = (op, msg) => {//游戏容器回调
        switch (op) {
            case "createCharacter":
                const createmsg = { name: msg }
                serverSocket.sendMessage(jsonHelp.createWsmessageJson("CreateCharacter", createmsg))
                break;
            case "exit":
                this.props.history.push("/")
                break;
            case "selectPlayer":
                if (msg === -1) {
                    this.sendGameTip(1, "账号已封禁无法选择！", "selectPlayer")
                    return
                } else {
                    this.sendGameTip(0, "游戏数据加载中...", "selectPlayer")
                    const selectmsg = { SerialNumber: msg }
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson("ChooseACharacter", selectmsg))
                }
                break;
            case "loadInfo":
                if (msg) {
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson("GetAttribute", ""))
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson("GetBackpack", ""))
                    this.sendGamePanel("RunLoad", "")
                } else {
                    this.sendGameTip(1, "加载数据失败,服务器拒绝", "loadInfo")
                }
                break;
            case "comloadingOK":
                this.loadGameInfoOK(op)
                break;
            default:
                break;
        }
    }

    callbackGameTip = (op, msg) => {//提示信息返回结果
        console.log(op, msg)
        switch (op) {
            case "socketError":
                this.props.history.push("/")
                break;
            default:
                break;
        }
    }

    loadGameInfoOK = (msg) => {
        console.log(msg + "loadingOK/" + GameLoadInfoCount)
        GameLoadInfoCount--
        if (GameLoadInfoCount === 0) {
            this.sendGameTip(-1, "", "loading")
        }
    }

    getSendGamePanel = (send) => {//获取游戏组件发送消息对象
        this.sendGamePanel = send
    }

    getSendGameTip = (send) => {//获取提示组件发送消息对象
        this.sendGameTip = send
    }

    render() {
        return (
            <div className="gameRoot">
                <GameTip getSend={this.getSendGameTip} callback={this.callbackGameTip} />
                <GamePanel getSend={this.getSendGamePanel} callback={this.callbackGamePanel} />
            </div>
        )
    }
}