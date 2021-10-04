
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
        console.log("getmsg:" + wsmsg.data)
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
                const jsonCharacterList = json["Message"]
                this.reView("PlayerList", jsonCharacterList)
                break;
            case "CreateCharacterReply":
                const jsonCreateCharacter = json["Message"]
                this.reView("CreatePlayerResult", jsonCreateCharacter)
                break;
            case "ChooseACharacterReply":
                const jsonChooseACharacter = json["Message"]
                this.reView("SelectPlayerResult", jsonChooseACharacter)
                break;

            case "AttributeReply":
                const jsonAttribute = json["Message"]
                this.reView("Attribute", jsonAttribute)
                break;
            case "BackpackReply":
                const jsonBackpack = json["Message"]
                this.reView("Backpack", jsonBackpack)
                break;
            default:
                break;
        }
    }

    connShutdown = () => {
        console.log("socket断开")
        this.reView("SocketError", "ShutDown")
    }

    sendMessage = (msg) => {
        console.log("sendmsg" + msg)
        this.socket.send(msg)
    }
};