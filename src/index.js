
import React from 'react'
import ReactDOM from 'react-dom'
import Login from './apps/login'
import Registered from './apps/registered'
import RPGGame from './apps/rpgGame'
import Activate from './apps/activate'
import Error from './404Page/error'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import './index.css'

var root = document.getElementById("root")
ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/registered" component={Registered} />
            <Route path="/rpgGame" component={RPGGame} />
            <Route path="/activate/:msg" component={Activate} />
            <Route component={Error} />
        </Switch>
    </Router>
), root)

window.onload = function () {
    //console.log("ok");
    document.getElementsByClassName("titleLogo")[0].innerHTML = "RPG大冒险"
}


