
import JsonHelper from '../Server/jsonHelper'


var jsonHelp = null
export default class MyWebSocket {

    constructor(url, reView) {
        this.url = url
        this.reView = reView
        this.socketEnable = false
        this.socket = null
        this.status = 0
    }

    connection = () => {
        if (this.socketEnable) {
            console.log("已连接服务器")
        } else {
            const url = this.url
            if ("WebSocket" in window) {
                jsonHelp = new JsonHelper()
                this.socket = new WebSocket(url)
                this.socket.onopen = this.connOpen
                this.socket.onmessage = this.connReceive
                this.socket.onclose = this.connShutdown
                this.socketEnable = true
                this.status = 1
            } else {
                console.log("浏览器不支持")
            }
        }
    }

    connOpen = () => {
        //console.log("连接成功")
        setInterval(() => {
            this.sendMessage(jsonHelp.createWsmessageJson("hart", ""))
        }, 30000);
    }

    connReceive = (wsmsg) => {
        console.log("数据接收msg:" + wsmsg.data)
        const json = JSON.parse(wsmsg.data)
        switch (json["operate"]) {
            case "LoginReply":
                const jsonLoginReply = json["Message"]
                if (jsonLoginReply["sOrF"]) {
                    this.reView("LoginStatus", "OK")
                } else {
                    this.reView("LoginStatus", "error")
                }
                break;
            case "CharacterListReply":
                const jsonCharacterList=json["Message"]
                this.reView("PlayerList", jsonCharacterList)
                break;
            default:
                break;
        }
    }

    connShutdown = () => {
        console.log("连接关闭")
    }

    sendMessage = (msg) => {
        this.socket.send(msg)
    }
};