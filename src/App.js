
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>RPGGame</h1>
                <form action="">
                    <label>
                        <input className="inputText" type="text" placeholder="账号" />
                    </label>
                    <br />
                    <label>
                        <input className="inputText" type="password" placeholder="密码" />
                    </label>
                </form>
                <input id="loginBtn" className="loginBtn" type="button" value="登录" />
                <p>没有账号? <a href="http://www.baidu.com">点此注册</a></p>
            </div>
        )
    }
}