import React, { Component } from 'react'
import { Spin } from 'antd'
import Fade from 'react-reveal/Fade'

import './Main.scss'

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.history.push('/login')
        }, 1000)
    }

    render(){
        return (
            <Fade>
                <div className="main-container">
                    <Spin style={{margin: "auto"}} size="large" />
                </div>
            </Fade>
        )
    }
}