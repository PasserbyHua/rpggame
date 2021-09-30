
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'


window.onload = function () {
    //console.log("ok");
    var root = document.getElementById("root");
    root.style.top = "-20%";
    ReactDOM.render(<App />, root);
}
