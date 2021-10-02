import { Component } from 'react'
import panelStyle from '../../css/gameAppCss/gamePanel.module.css'

export default class GamePanel extends Component{
    /* constructor(props){
        super(props)
    } */

    componentDidMount() {
        this.props.getSend(this.updateTipInfo)
    }
    
    updateTipInfo = (op, msg) => {
        switch (op) {
            case "PlayerList":
                this.showPlayerList(msg)
                break;
            default:
                break;
        }
    }

    showPlayerList=(list)=>{
        
    }

    callbackParent=(op,msg)=>{
        this.props.callback(op, msg)
    }

    render(){
        return(
            <div className={panelStyle.back}>
                
            </div>
        )
    }
}