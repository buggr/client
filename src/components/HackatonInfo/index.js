import React, { Component } from 'react'
import { Spin, Avatar, Icon } from 'antd'

import Api from '../../services/Api'

import './style.scss'

const team = [1, 2, 3, 4, 5]

export default class HackatonInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            hackaton_id: this.props.match.params.hackaton_id,
            hackaton: {},
            ready: false,
        }
    }

    componentDidMount(){
        const [ hackaton ] = Api().filter(data => data.id === +this.state.hackaton_id)

        setTimeout(() => {
            this.setState({ hackaton, ready: true })
        }, 0)
    }

    render(){
        return(
            <div className="hackaton-info-container">
                {
                    this.state.ready
                    ?   (<>
                            <button
                                disabled={!this.state.hackaton.ended}
                                style={{
                                    backgroundColor: this.state.hackaton.ended ? "#ff1060" : "#666"
                                }}
                            >
                                {this.state.hackaton.ended ? "VER FEEDBACK" : "FEEDBACK INDISPONÍVEL"}
                            </button>
                            <HackatonAboutCard />
                            <TeamAboutCard />
                            <ProjectAboutCard />
                        </>)
                    :   <Spin 
                            style={{ margin: "auto" }} 
                            size="large" 
                        />
                }
            </div>
        )
    }
}

function HackatonAboutCard(){
    return(
        <div className="about-card-container">
            <h1 className="card-title">Hackaton</h1>
            <p>
                <strong>Name: </strong>OpenHack Shawee
                <br></br>
                <strong>Status: </strong>Em Andamento
            </p>
        </div>
    )
}

function TeamAboutCard(){
    return(
        <div className="about-card-container">
            <h1 className="card-title">Team</h1>
            {
                team.map(member => <Avatar key={member} style={{ marginRight: 5 }} icon="user" size={40} />)
            }
        </div>
    )
}

function ProjectAboutCard(){
    return(
        <div className="about-card-container">
            <h1 className="card-title">Project</h1>
            <p>
                <strong>Name: </strong>Opinaton
                <br></br>
                <strong>Description: </strong>
                Um app feito para ajudar os hackers a voltarem do hackaton 
                sabendo o que é necessário ser feito para vencer na próxima tentativa.
            </p>
        </div>
    )
}