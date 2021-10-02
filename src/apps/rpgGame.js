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
    state = {
    }
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
        console.log(op, msg)
    }

    callbackGameTip = (op, msg) => {
        console.log(op, msg)
    }

    render() {
        return (
            <div className="gameRoot">
                <GamePanel getSend={this.getSendGamePanel} callback={this.callbackGamePanel} />
                <GameTip getSend={this.getSendGameTip} callback={this.callbackGameTip} />
            </div>
        )
    }
}