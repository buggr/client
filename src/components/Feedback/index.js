import React, { Component } from 'react'
import { Spin, Rate } from 'antd'

import './style.scss'

export default class Feedback extends Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            team: "buggr",
            rate: 0,
        }
    }

    componentDidMount(){
        this.setState({ ready: true })
    }

    handleRate = rate => this.setState({ rate })

    render(){
        return(
            <div className="feedback-container">
                {
                    this.state.ready
                    ?   <>
                            <h1 className="presentation-name">A equipe <strong>{this.state.team}</strong> está apresentando!</h1>
                            <h1 className="presentation-opnion">Dê sua opnião!</h1>
                            <Rate value={this.state.rate} onChange={rate => this.handleRate(rate)}></Rate>
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