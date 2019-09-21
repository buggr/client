import React, { Component } from 'react'
import { Spin, Rate, Button } from 'antd'

import './style.scss'

export default class Feedback extends Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            team: "buggr",
            rate: 0,
            feedback: '',
            loading: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.setState({ ready: true })
    }

    handleRate = rate => this.setState({ rate })

    handleChange = event => this.setState({ [event.target.name]: event.target.value })

    handleSubmit(){
        this.setState({ loading: true })
    }

    render(){
        return(
            <div className="feedback-container">
                {
                    this.state.ready
                    ?   <>
                            <h1 className="presentation-name">A equipe <strong>{this.state.team}</strong> está apresentando!</h1>
                            <h1 className="presentation-opnion">Dê sua opnião!</h1>
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