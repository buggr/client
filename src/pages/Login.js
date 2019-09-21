import React, { Component } from 'react'

import logo from '../assets/logo.png'

import './Login.scss'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({ email: '', password: '' })
        this.props.history.push('/dashboard')
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
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}