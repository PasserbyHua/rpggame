import { Component, createRef } from 'react'
import createStyle from '../../css/gameAppCss/gameCreate.module.css'
import MessageHandler from '../../Server/eventHandler'


export default class GameCreate extends Component {
    state = {
        Hide: "none",
        characterName: "",
        tip: "",
        re: true,
        btnEnable: true,
        animation:""
    }

    constructor(){
        super()
        console.log("GameCreate组件加载")
    }

    setHandler = (e) => {
        const tag = e.target
        const value = tag.value
        const name = tag.name
        this.setState({
            [name]: value
        })
    }

    componentDidMount = () => {
        this.tip = createRef()
        this.setState({ btnEnable: true })
        MessageHandler.addListener("callCreatePlayer", this.getPanelMessage)
    }

    componentWillUnmount = () => {
        MessageHandler.removeListener("callCreatePlayer", this.getPanelMessage)
    }

    getPanelMessage = (msg) => {
        switch (msg.op) {
            case "create":
                this.setState({
                    Hide: "block",
                    characterName: "",
                    tip: "长度在4到8位之间",
                    btnEnable: true,
                    animation:"show 1s"
                })
                break;
            case "createRes":
                console.log(msg.msg.sOrF)
                if (msg.msg.sOrF) {
                    this.setState({
                        tip: "创建成功!",
                        animation:"hide 1s forwards"
                    })  
                    setTimeout(()=>{
                        this.setState({
                            Hide: "none"
                        })
                    },1000)
                } else {
                    this.setState({
                        tip: "创建失败，请重新尝试",
                        btnEnable:true
                    })
                }
                break;
            default:
                break;
        }
    }

    ok = () => {
        if (!this.state.btnEnable) {
            this.state.re ? this.tip.current.style.animation = "tipError 1s" : this.tip.current.style.animation = "tipErrorRe 1s"
            this.setState({
                re: !this.state.re
            })
            return
        }
        if (this.state.characterName.trim().length > 6 || this.state.characterName.trim().length < 4) {
            this.state.re ? this.tip.current.style.animation = "tipError 1s" : this.tip.current.style.animation = "tipErrorRe 1s"
            this.setState({
                tip: "长度在4到8位之间的数字或字母，且不能为空！",
                re: !this.state.re
            })
            return
        } else {
            this.setState({
                tip: "创建中...",
                re: !this.state.re,
                btnEnable: false
            })
            const msg = { op: "ok", name: this.state.characterName }
            MessageHandler.emit("callbackCreatePlayer", msg)
        }
    }

    cancel = () => {
        if (!this.state.btnEnable) {
            this.state.re ? this.tip.current.style.animation = "tipError 1s" : this.tip.current.style.animation = "tipErrorRe 1s"
            this.setState({
                re: !this.state.re
            })
            return
        }
        this.setState({
            Hide: "none"
        })
    }

    render() {
        var characterName = this.state.characterName
        return (
            <div className={createStyle.back} style={{ display: this.state.Hide,animation:this.state.animation }}>
                <div  className={createStyle.context}>
                    <p>请输入你的角色名</p>
                    <input className={createStyle.input} type="text" name="characterName" placeholder="角色名" value={characterName} onChange={this.setHandler} />
                    <div className={createStyle.tip} ref={this.tip}><span>{this.state.tip}</span></div>
                    <div>
                        <div className={createStyle.btn} onClick={this.ok}>创建</div>
                        <div className={createStyle.btn} onClick={this.cancel}>取消</div>
                    </div>
                </div>
            </div>
        )
    }
}