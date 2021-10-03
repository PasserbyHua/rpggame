import { Component } from 'react'
import '../css/rpgGame.css'
import MyWebSocket from '../Server/serverHelper'
import JsonHelper from '../Server/jsonHelper'
import GamePanel from './gameApp/gamePanel'
import GameTip from './gameApp/gameTip'


var token = ""
var serverSocket = null
var jsonHelp = null


export default class RPGGame extends Component {
    constructor() {
        super()
        document.getElementsByTagName("title")[0].innerText = 'RPGGame'
        document.getElementsByClassName("titleLogo")[0].classList.add("titleLogoMin")
    }
    componentDidMount() {
        this.sendGameTip(0, "正在连接服务器...")
        try {
            token = this.props.location.state.token
        } catch {
            //console.log("无效登录")
            this.props.history.push("/")
        }
        //console.log("即将连接服务器")
        serverSocket = new MyWebSocket("ws://119.29.195.22:8888/ws/RPGGameBar?access_token=" + token, this.refreshWindow)
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

    refreshWindow = (appId, serverMsg) => {
        //console.log("viewmsg" + serverMsg)
        switch (appId) {
            case "LoginStatus":
                if (serverMsg === "OK") {
                    //console.log("获取列表")
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson("CharacterList", ""))
                } else if (serverMsg === "error") {
                    this.sendGameTip(1, "连接服务器失败！请刷新页面后重试")
                }
                break;
            case "PlayerList":
                this.sendGamePanel("PlayerList", serverMsg)
                this.sendGameTip(-1, "null")
                break;
            case "CreatePlayerResult":
                serverSocket.sendMessage(jsonHelp.createWsmessageJson("CharacterList", ""))
                this.sendGamePanel("CreatePlayer", serverMsg)
                break
            case "SelectPlayerResult":
                this.sendGamePanel("SelectPlayer", serverMsg)
                break
            case "Attribute":
                //console.log("AttributeReply:" + serverMsg)
                break
            case "Backpack":
                //console.log("BackpackReply:" + serverMsg)
                break
            default:
                break;
        }
    }

    getSendGamePanel = (send) => {
        this.sendGamePanel = send
    }

    getSendGameTip = (send) => {
        this.sendGameTip = send
    }

    callbackGamePanel = (op, msg) => {
        switch (op) {
            case "createCharacter":
                const createmsg = { name: msg }
                serverSocket.sendMessage(jsonHelp.createWsmessageJson("CreateCharacter", createmsg))
                break;
            case "exit":
                this.props.history.push("/")
                break;
            case "selectPlayer":
                //console.log(msg)
                if (msg === -1) {
                    this.sendGameTip(1, "账号已封禁无法选择！")
                    return
                } else {
                    this.sendGameTip(0, "加载角色数据...")
                    const selectmsg = { SerialNumber: msg }
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson("ChooseACharacter", selectmsg))
                }
                break;
            case "loadInfo":
                if (msg) {
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson("GetAttribute", ""))
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson("GetBackpack", ""))
                } else {
                    this.sendGameTip(1, "加载数据失败")
                }
                break;
            default:
                break;
        }
    }

    callbackGameTip = (op, msg) => {
        console.log(op, msg)
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