
import React from 'react'
import ReactDOM from 'react-dom'
import Login from './apps/login'
import Registered from './apps/registered'
import RPGGame from './apps/rpgGame'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'

var root = document.getElementById("root")
ReactDOM.render((
    <Router>
        <Route exact path="/" component={Login} />
        <Route path="/registered" component={Registered} />
        <Route path="/rpgGame" component={RPGGame} />
    </Router>
), root)

window.onload = function () {
    //console.log("ok");
}


