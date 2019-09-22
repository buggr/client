import React, { Component } from 'react'
import { Spin, Rate, Button, message } from 'antd'

import './style.scss'
import Api from '../../services/Api'
// import { Socket } from 'dgram'

import socketIOClient from "socket.io-client"

const socket = socketIOClient('http://127.0.0.1:3030')

export default class Feedback extends Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            team: "buggr",
            rate: 0,
            feedback: '',
            loading: false,
            team_id: '',
            project_id: '',
            project: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        socket.emit('enteredPresentation')
        socket.on('runingPresentation', teamId => {
            this.setState({ team_id: teamId , ready: true})
            console.log('team_id', teamId)
        })
    }

    componentWillUnmount() {
        socket.emit('leavedPresentation')
    }

    async getData(){
        const { data: teams } = await Api.get('/team?_id=' + this.state.team_id)
        this.setState({ project_id: teams[0].projects[0]._id })
    }

    handleRate = rate => this.setState({ rate })

    handleChange = event => {
        this.getData()
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(){
        socket.emit('leavedPresentation')

        this.state.project.push({
            score: this.state.rate, 
            notes: this.state.feedback
        })

        this.setState({
            ready: false
        })
        this.postData()
        message.success("Votação realizada com sucesso")
    }

    async postData() {
        Api.post(`/projects/${this.state.project_id}`, {feedback: this.state.project[0]})
        console.log('Updatado!', this.state.project_id, 'project', {feedback: this.state.project[0]})
    }

    render(){
        return(
            <div className="feedback-container">
                {
                    this.state.ready
                    ?   <>
                            <h1 className="presentation-name">A equipe <strong>{this.state.team}</strong> está apresentando!</h1>
                            <h1 className="presentation-opnion">Dê sua opinião!</h1>
                            <Rate 
                                value={this.state.rate} 
                                onChange={rate => this.handleRate(rate)}
                                style={{margin: "0 auto"}}
                            />
                            <textarea 
                                placeholder="Deseja dizer algo para a equipe?"
                                onChange={event => this.handleChange(event)}
                                value={this.state.feedback}
                                name="feedback"
                                type="text"
                            />
                            <Button 
                                htmlType="submit" 
                                loading={this.state.loading}
                                onClick={this.handleSubmit}
                            >
                                Votar
                            </Button>
                        </>
                    :   <div className="feedback-loading">
                            <h1>Aguardando alguma sala ser aberta...</h1>
                            <Spin 
                                size="large" 
                            />
                        </div>
                }
            </div>
        )
    }
}