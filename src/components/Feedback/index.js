import React, { Component } from 'react'
import { Spin } from 'antd'

import './style.scss'

export default class Feedback extends Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="feedback-container">
                {
                    this.state.ready
                    ?   <h1>EAE</h1>
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