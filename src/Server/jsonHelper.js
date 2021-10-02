

export default  class JsonHelper {
    createWsmessageJson = (operate, Message) => {
        return JSON.stringify({
            operate: operate,
            Message: Message
        })
    }
}