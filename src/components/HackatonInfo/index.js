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
        }

        this.handleFeedbacks = this.handleFeedbacks.bind(this)
    }

    componentDidMount(){
        const [ hackaton ] = Api().filter(data => data.id === +this.state.hackaton_id)

        setTimeout(() => {
            this.setState({ hackaton, ready: true })
        }, 0)
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
                            <HackatonAboutCard />
                            <TeamAboutCard />
                            <ProjectAboutCard />
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
                                        centered
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

function HackatonAboutCard(){
    return(
        <div className="about-card-container">
            <div className="card-header">
                <Icon type="info-circle" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Hackaton</h1>
            </div>
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
            <div className="card-header">
                <Icon type="team" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Team</h1>
            </div>
            {
                team.map(member => <Avatar key={member} style={{ marginRight: 5 }} icon="user" size={40} />)
            }
        </div>
    )
}

function ProjectAboutCard(){
    return(
        <div className="about-card-container">
            <div className="card-header">
                <Icon type="project" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Project</h1>
            </div>
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

function FeedbackList(){
    return(<>
        <div className="feedback-container">
            <div className="feedback-side">
                <Rate value={4} />
            </div>
            <p>
                Eu achei o projeto muito legal, porém, imagino que caso tivessem dado uma ênfase
                maior na parte da parte interessante teria ficado muito melhor ainda!
            </p>
        </div>
        <div className="feedback-container">
            <div className="feedback-side">
                <Rate value={5} />
            </div>
            <p>
                Sensacional! Ter focado na parte do sei lá o que ajudou muito!
            </p>
        </div>
    </>)
}