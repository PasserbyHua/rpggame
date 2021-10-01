/**
 * 参数：[socketOpen|socketClose|socketMessage|socketError] = func，[socket连接成功时触发|连接关闭|发送消息|连接错误]
 * timeout：连接超时时间
 * @type {module.webSocket}
 */


module.exports = class webSocket {

    constructor(url,reView) {
        this.url = url
        this.reView=reView
        this.socketEnable = false
        this.socket = null
        this.status = 0
    }

    connection = () => {
        if (this.socketEnable) {
            console.log("已连接服务器")
        } else {
            console.log("尝试连接服务器")
            const url = this.url
            if ("WebSocket" in window) {
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
        console.log("连接成功")
    }

    connReceive = (msg) => {
        console.log("数据接收msg:" + msg.data)
        const json=JSON.parse(msg)
        console.log("数据接收:" + json)
        this.reView(0,json)
    }

    connShutdown = () => {
        console.log("连接关闭")
    }

    sendMessage = (msg) => {
        this.socket.send(msg)
    }
};