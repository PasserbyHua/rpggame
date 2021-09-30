
import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: "",
            tip: "",
            loginEnable: true
        };
        this.setAccount = this.setAccount.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.login = this.login.bind(this);
    }

    registered(){
        window.location.href="registered.html";
    }

    login() {
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
            /* fetch('http://119.29.195.22:8888/api/account/login', {
                method: 'POST',
                body: JSON.stringify({
                    userName: account,
                    password: password
                })
            }).then(data => {
                console.log(data);
            }); */
        } else {
            this.setState({
                tip: "正在登录中..."
            });
        }
    }

    setAccount(event) {
        console.log(event.target.value);
        this.setState({
            account: event.target.value
        });
    }

    setPassword(event) {
        console.log(event.target.value);
        this.setState({
            password: event.target.value
        });
    }
    render() {
        var account = this.state.account;
        var password = this.state.password;
        var tip = this.state.tip;
        return (
            <div>
                <h1>RPGGame</h1>
                <form action="">
                    <label>
                        <input className="inputText" type="text" placeholder="账号" value={account} onChange={this.setAccount} />
                        <br />
                        <div>
                            <span className="logintip">{tip}</span>
                        </div>
                    </label>
                    <br />
                    <label>
                        <input className="inputText" type="password" placeholder="密码" value={password} onChange={this.setPassword} />
                        <br />
                        <label className="logintip" htmlFor="savePwd"><input type="checkbox" id="savePwd" />记住密码</label>
                    </label>
                </form>
                <input id="loginBtn" className="loginBtn" type="button" value="登录" onClick={this.login} />
                <p>没有账号? <a href="#!" onClick={this.registered}>点此注册</a></p>
            </div>
        )
    }
}