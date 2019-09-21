import React, { Component } from 'react'
import { Button } from 'antd'

import logo from '../assets/logo.png'

import './Login.scss'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
        }
    }

    handleChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({ loading: true, email: '', password: '' })
        setTimeout(() => {
            this.props.history.push('/dashboard/hackatons')
        }, 1000)
    }

    render(){
        return (
            <div className="login-container">
                <img className="logo" src={logo} alt="" />
                <form className="form-container" onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="Type your email" 
                        type="text" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input 
                        placeholder="Your password" 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Button 
                        htmlType="submit" 
                        loading={this.state.loading}
                    >
                        Login
                    </Button>
                </form>
            </div>
        )
    }
}