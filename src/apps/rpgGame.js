import { Component } from 'react'
import '../css/rpgGame.css'
import Socket from '../Server/serverHelper'
import jsonHelper from '../Server/jsonHelper'

var token = ""
var serverSocket = null
var jsonHelp = null
export default class RPGGame extends Component {
    state = {
    }
    constructor() {
        super()
        document.getElementsByTagName("title")[0].innerText = 'RPGGame'
    }
    componentDidMount() {
        try {
            token = this.props.location.state.token
            console.log(token)
        } catch {
            console.log("无效登录")
            this.props.history.push("/")
        }
        console.log("即将连接服务器")
        serverSocket = new Socket("ws://119.29.195.22:8888/ws/RPGGameBar?access_token=" + token, this.refreshWindow)
        jsonHelp = new jsonHelper()
        try {
            serverSocket.connection()
            var waitconn = setInterval(() => {
                if(serverSocket.status===1){
                    console.log("登录成功，获取列表")
                    serverSocket.sendMessage(jsonHelp.createWsmessageJson(
                        "CharacterList",
                        ""
                    ))
                    clearInterval(waitconn)
                }
            },1000)
        } catch (e) {
            console.log(e.message)
        }
    }

    refreshWindow = (appId, viewMsg) => {
        console.log(viewMsg)
    }

    render() {
        return (
            <div className="gameRoot">
                <h1>游戏画面</h1>
            </div>
        )
    }
}