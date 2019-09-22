import React, { Component } from 'react'
import { Spin, Avatar, Modal, Button, Icon, Rate } from 'antd'

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
            modal: false,
            teams: [],
            project: {}
        }

        this.handleFeedbacks = this.handleFeedbacks.bind(this)
    }

    componentDidMount(){
        this.getData()
    }

    async getData(){
        const { data: teams } = await Api.get('/team?name=buggr')
        const { data: hackatons } = await Api.get('/hackathons')
        const [ hackaton ] = hackatons.filter(hackaton => hackaton._id === this.state.hackaton_id)
        this.setState({ hackaton, team: teams[0], project: teams[0].projects[0], ready: true })
    }

    handleFeedbacks(){
        if (!this.state.hackaton.ended) return

        this.setState({ modal: true })
    }

    render(){
        return(
            <div className="hackaton-info-container">
                {
                    this.state.ready
                    ?   (<>
                            <button
                                onClick={this.handleFeedbacks}
                                style={{
                                    backgroundColor: this.state.hackaton.ended ? "#ff1060" : "#666"
                                }}
                            >
                                {this.state.hackaton.ended ? "VER FEEDBACK" : "FEEDBACK INDISPONÍVEL"}
                            </button>
                            <HackatonAboutCard hackaton={this.state.hackaton} />
                            <TeamAboutCard team={this.state.team} />
                            <ProjectAboutCard project={this.state.project} />
                            <Modal
                                title="Feedbacks"
                                onCancel={() => this.setState({ modal: false })}
                                onOk={() => this.setState({ modal: false })}
                                visible={this.state.modal}
                                footer={[
                                    <Button 
                                        key="submit" 
                                        type="primary" 
                                        onClick={() => this.setState({ modal: false })}
                                    >
                                        Fechar
                                    </Button>
                                ]}
                            >
                                <FeedbackList />
                            </Modal>
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

function HackatonAboutCard({ hackaton }){
    return(
        <div className="about-card-container">
            <div className="card-header">
                <Icon type="info-circle" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Hackaton</h1>
            </div>
            <p>
                <strong>Name: </strong>{hackaton.name}
                <br></br>
                <strong>Status: </strong>{hackaton.ended ? 'Finalizado' : 'Em Andamento'}
            </p>
        </div>
    )
}

function TeamAboutCard({ team }){
    return(
        <div className="about-card-container">
            <div className="card-header">
                <Icon type="team" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Team</h1>
            </div>
            {
                team.participants.map(participant => <Avatar key={participant._id} style={{ marginRight: 5 }} icon="user" size={40} />)
            }
        </div>
    )
}

function ProjectAboutCard({ project }){
    return(
        <div className="about-card-container">
            <div className="card-header">
                <Icon type="project" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Project</h1>
            </div>
            <p>
                <strong>Name: </strong>{project.name}
                <br></br>
                <strong>Description: </strong>{project.description}
            </p>
        </div>
    )
}

function FeedbackList(){
    return(<>
        <div className="feedback-card-container">
            <div className="feedback-side">
                <Rate value={4} />
            </div>
            <p>
                Eu achei o projeto muito legal, porém, imagino que caso tivessem dado uma ênfase
                maior na parte da parte interessante teria ficado muito melhor ainda!
            </p>
        </div>
    </>)
}