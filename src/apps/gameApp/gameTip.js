import { Component } from 'react'
import { Link } from 'react-router-dom'
import tipStyle from '../../css/gameAppCss/gameTip.module.css'

export default class GameTip extends Component {

    state = {
        op: 0,
        hide: "none",
        msg: "",
        msgid: ""
    }
    constructor(props) {
        super(props)
        console.log("GameTip组件加载")
    }

    componentDidMount() {
        this.props.getSend(this.updateTipInfo)
    }

    updateTipInfo = (op, msg, msgid) => {
        if (op === -1) {
            this.setState({
                op: op,
                hide: "none",
                msg: msg,
                msgid: msgid
            })
            return
        }
        this.setState({
            op: op,
            hide: "block",
            msg: msg,
            msgid: msgid
        })
    }

    callbackParent = (msg) => {
        this.props.callback(this.state.msgid, msg)
    }

    confirm = (e) => {
        e.preventDefault()
        this.callbackParent("yes")
        this.setState({
            op: -1,
            hide: "none",
            msg: "null"
        })
    }

    cancel = (e) => {
        e.preventDefault()
        this.callbackParent("no")
        this.setState({
            op: -1,
            hide: "none",
            msg: "null"
        })
    }

    render() {

        return (
            <div className={tipStyle.back} style={{ display: this.state.hide }}>
                <div className={tipStyle.tipWindow}>
                    <h1>提示</h1>
                    <p>{this.state.msg}</p>
                    <div>
                        <Link to="" onClick={this.confirm} className={[tipStyle.link, this.state.op === 1 ? tipStyle.linkone : this.state.op === 2 ? tipStyle.linktwo : tipStyle.linkHide].join(' ')}>确定</Link>
                        <Link to="" onClick={this.cancel} className={[tipStyle.link, this.state.op === 1 ? tipStyle.linkone : this.state.op === 2 ? tipStyle.linktwo : tipStyle.linkHide].join(' ')}>取消</Link></div>
                </div>
            </div>
        )
    }
}