import { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/registered.css'

export default class Registered extends Component {

    state = {
        account: "",
        password: "",
        accTip: "",
        passTip: "",
        registeredEnable: true
    }

    constructor() {
        super()
        document.getElementsByTagName("title")[0].innerText = 'RPGGame-注册'
    }

    login = () => {
        //console.log("ok")

    }

    registered = () => {
        var account = this.state.account
        var password = this.state.password
        if (account.trim().length === 0) {
            this.setState({
                accTip: "账号不能为空"
            })
            return
        }
        if (password.trim().length === 0) {
            this.setState({
                passTip: "密码不能为空"
            })
            return
        }
        if (account.trim().length < 6) {
            this.setState({
                accTip: "账号太短"
            })
            return
        } else {
            this.setState({
                accTip: ""
            })
        }
        if (password.trim().length < 6) {
            this.setState({
                passTip: "密码太短"
            })
            return
        } else {
            this.setState({
                passTip: ""
            })
        }
        console.log(account + "/" + password);
        if (this.state.registeredEnable) {
            this.setState({
                registeredEnable: false,
                passTip: "正在注册中..."
            });
            const url = "http://119.29.195.22:8888/api/Account/Register"
            var data = {
                userName: account,
                password: password
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    this.setState({
                        registeredEnable: true,
                        passTip: "注册失败,请检查格式是否正确"
                    })
                    return ""
                }
            }).then(resJson => {
                if (resJson === "") return
                this.setState({
                    passTip: resJson.message
                })
                if (resJson.sOrF) {
                    setTimeout(()=>window.location.href="/",1000)
                }
            })
        } else {
            this.setState({
                tip: "正在登录中..."
            })
        }
    }

    setHandler = (e) => {
        const tag = e.target
        const value = tag.type === 'checkbox' ? tag.checked : tag.value
        const name = tag.name
        //console.log(value)
        this.setState({
            [name]: value
        })
    }

    render() {
        var account = this.state.account
        var accTip = this.state.accTip
        var passTip = this.state.passTip
        return (
            <div className="registeredRoot">
                <h1>注册</h1>
                <form>
                    <label>
                        <input name="account" type="text" className="inputText" placeholder="输入你的账号" value={account} onChange={this.setHandler} />
                        <br />
                        <span className="logintip">{accTip}</span>
                    </label>
                    <br />
                    <label>
                        <input name="password" type="password" className="inputText" placeholder="输入你的密码" onChange={this.setHandler} />
                        <br />
                        <span className="logintip">{passTip}</span>
                    </label>
                </form>
                <input type="button" value="注册" className="loginBtn" onClick={this.registered} />
                <p>已有账号? <Link to="/" className="link" onClick={this.login}>点此登录</Link></p>
            </div>
        )
    }
}