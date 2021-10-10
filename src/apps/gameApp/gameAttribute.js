import { Component } from 'react'
import attributeStyle from '../../css/gameAppCss/gameAttribute.module.css'
import MessageHandler from '../../Server/eventHandler'


export default class GameAttribute extends Component {
    state = {
        attributeInfo: null,
        hide: "none",
        animation: ""
    }
    componentDidMount = () => {//加载完成调用
        MessageHandler.addListener("callAttribute", this.getPanelMsg)
        MessageHandler.emit("callbackLoadOK", { op: "comloadingOK", msg: "" })
    }
    componentWillUnmount = () => {//删除组件调用
        MessageHandler.removeListener("callAttribute", this.getPanelMsg)
    }

    getPanelMsg = (pmsg) => {
        switch (pmsg.op) {
            case "playerAttribute":
                console.log("接收playerAttribute资源" + pmsg.msg)
                this.setState({
                    attributeInfo: pmsg.msg
                })
                break;
            case "show":
                if (this.state.hide === "block") {
                    this.hideBtn()
                } else {
                    this.setState({
                        hide: "block",
                        animation: "infoShow 0.1s forwards ease"
                    })
                }
                break
            default:
                break;
        }
    }

    constructor() {
        super()
        console.log("GameAttribute组件加载")
    }

    hideBtn = () => {
        this.setState({ animation: "infoHide 0.1s forwards ease" })
        setTimeout(() => { this.setState({ hide: "none" }) }, 100)
    }

    render() {
        return (
            <div className={attributeStyle.back} style={{ display: this.state.hide, animation: this.state.animation }}>
                <div className={attributeStyle.contextback}>
                    <p>个人信息</p>
                    <div className={attributeStyle.context}>
                        {this.state.attributeInfo !== null &&
                            <div>
                                <p>玩家名：{this.state.attributeInfo.Name}</p>
                                <p>
                                    <span>等级：{this.state.attributeInfo.Level}</span>
                                    <span>经验：{this.state.attributeInfo.Exp}</span>
                                </p>
                                
                                <p>
                                    <span>血量：{this.state.attributeInfo.Hp}</span>
                                    <span>法力值：{this.state.attributeInfo.Mp}</span>
                                </p>
                                
                                <p>
                                    <span>攻击力：{this.state.attributeInfo.ATTACK}</span>
                                    <span>魔法攻击力：{this.state.attributeInfo.MAGIC}</span>
                                </p>
                                
                                <p>
                                    <span>防御力：{this.state.attributeInfo.DEFENSE}</span>
                                    <span>魔法防御力：{this.state.attributeInfo.RESISTANCE}</span>
                                </p>
                                
                                <p>
                                    <span>暴击率：{this.state.attributeInfo.THUMP}</span>
                                    <span>暴击抗性：{this.state.attributeInfo.OBTUSE}</span>
                                </p>
                                
                                <p>
                                    <span>命中率：{this.state.attributeInfo.HIT}</span>
                                    <span>闪避率：{this.state.attributeInfo.MISS}</span>
                                </p>
                                
                                <p>
                                    <span>吸血率：{this.state.attributeInfo.VAMPIRE}</span>
                                    <span>反伤率：{this.state.attributeInfo.BRAMBLES}</span>
                                </p>
                                
                                <p>
                                    <span>护盾值：{this.state.attributeInfo.SHIELD}</span>
                                    <span>穿甲：{this.state.attributeInfo.PUNCTURE}</span>
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <div className={attributeStyle.hideBtn} onClick={this.hideBtn}></div>
            </div>
        )
    }
}