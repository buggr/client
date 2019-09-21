import React, { Component } from 'react'
import { Icon } from 'antd'

import './style.scss'

let equipes = []

for(let i=0; i<10; i++){
    equipes.push({name: 'buggr' + i, id: i})
}

export default class Presentation extends Component {
    constructor(props){
        super(props)
        this.state = {
            current_team: 1,
            presentation: false,
        }
    }

    handlePresentation = (team_id) => {
        if(this.state.presentation && this.state.current_team === +team_id){
            this.setState({
                presentation: false,
                current_team: team_id
            })
        }
        else if(!this.state.presentation){
            this.setState({
                presentation: true,
                current_team: team_id
            })
        }
    }

    render(){
        return(
            <div className="presentation-container">
                {
                    equipes.map(equipe => 
                        <div 
                            className="team-card" 
                            style={{
                                opacity: this.state.presentation && this.state.current_team !== +equipe.id ? 0.5 : 1
                            }}
                        >
                            <h1>{equipe.name}</h1>
                            <div 
                                className="status" 
                                style={{
                                    backgroundColor: this.state.presentation && this.state.current_team === +equipe.id ? "#db2222" : "#199719"
                                }}
                            >
                                <Icon 
                                    type={this.state.presentation && this.state.current_team === +equipe.id ? "close" : "check"} 
                                    onClick={() => this.handlePresentation(equipe.id)}
                                    style={{ 
                                        fontSize: 20, 
                                        margin: "auto", 
                                        color: "#FFF",
                                    }} 
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}