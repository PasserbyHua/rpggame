
import { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/login.css'
import { setCookie, getCookie } from '../Cookie'

export default class Login extends Component {
    state = {
        account: "",
        password: "",
        tip: "",
        loginEnable: true,
        saveChecked: false,
        saveRecord: false,
        oldAccount: "",
        oldPassword: ""
    }

    constructor() {
        super()
        document.getElementsByTagName("title")[0].innerText = 'RPGGame-登录'
    }
    componentDidMount() {
        if (getCookie("saveRecord") === "true") {
            const account=getCookie("account")
            const password= getCookie("password")
            this.setState({
                oldAccount: account,
                oldPassword: password
            })
            this.setState({
                account: account,
                password: password,
                saveChecked: true,
                saveRecord: true
            })
            //console.log(account)
        }
    }

    login = () => {
        var account = this.state.account;
        var password = this.state.password;
        if (account.trim().length === 0) {
            this.setState({
                tip: "账号不能为空"
            });
            return;
        }
        if (password.trim().length === 0) {
            this.setState({
                tip: "密码不能为空"
            });
            return;
        }
        //console.log(account + "/" + password);
        if (this.state.loginEnable) {
            this.setState({
                loginEnable: false,
                tip: "正在登录中..."
            });
            const url = "http://119.29.195.22:8888/api/Account/Login"
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
                this.setState({
                    loginEnable: true
                })
                if (res.ok) {
                    return res.json()
                } else {
                    this.setState({
                        registeredEnable: true,
                        tip: "登录失败,请检查网络是否正常"
                    })
                    return ""
                }
            }).then(resJson => {
                if (resJson === "") return
                if (resJson.sOrF) {
                    if (this.state.saveChecked) {
                        if (this.state.saveRecord) {
                            if (this.state.oldAccount === account && this.state.oldPassword === password) {
                                //console.log("已保存")
                            } else {
                                setCookie("saveRecord", "true", 7)
                                setCookie("account", account, 7)
                                setCookie("password", password, 7)
                            }
                        } else {
                            setCookie("saveRecord", "true", 7)
                            setCookie("account", account, 7)
                            setCookie("password", password, 7)
                        }
                    } else {
                        if (this.state.saveRecord) {
                            setCookie("saveRecord", "false")
                        }
                    }
                    this.setState({
                        tip: "登陆成功!"
                    })
                    setTimeout(() => {
                        this.props.history.push({
                            pathname: "/rpgGame",
                            state: {
                                token: resJson.message
                            }
                        })
                    }, 1000)
                } else {
                    this.setState({
                        tip: resJson.message
                    })
                }
            });
        } else {
            this.setState({
                tip: "正在登录中..."
            });
        }
    }

    setHandler = (e) => {
        const tag = e.target
        const value = tag.type === 'checkbox' ? tag.checked : tag.value
        const name = tag.name
        this.setState({
            [name]: value
        })
    }

    render() {
        var account=this.state.account
        var password=this.state.password
        var tip=this.state.tip
        return (
            <div className="loginRoot">
                <h1>RPGGame</h1>
                <form>
                    <label>
                        <input name="account" className="inputText" type="text" placeholder="账号" value={account} onChange={this.setHandler} />
                        <br />
                        <div>
                            <span className="logintip">{tip}</span>
                        </div>
                    </label>
                    <br />
                    <label>
                        <input name="password" className="inputText" type="password" placeholder="密码" value={password} onChange={this.setHandler} />
                        <br />
                        <label className="logintip" htmlFor="savePwd">
                            <input name="saveChecked" type="checkbox" id="savePwd" checked={this.state.saveChecked} onChange={this.setHandler} />
                            记住密码
                        </label>
                    </label>
                </form>
                <input id="loginBtn" className="loginBtn" type="button" value="登录" onClick={this.login} />
                <p>没有账号? <Link to="/registered" className="link">点此注册</Link></p>
            </div>
        )
    }
}
