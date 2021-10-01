

module.exports = class jsonHelper {
    createWsmessageJson = (operate, Message) => {
        return JSON.stringify({
            operate: operate,
            Message: Message
        })
    }
}