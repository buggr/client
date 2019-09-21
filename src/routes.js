import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Main from './pages/Main'

import Hackatonlist from './components/HackatonList'

export function MainRoutes(){
    return (
        <BrowserRouter>
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
        </BrowserRouter>
    )
}

export function DashboardRoutes(){
    return (
        <>
            <Route path="/dashboard/hackatons" component={Hackatonlist} />
        </>
    )
}