import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'

import Hackatonlist from './components/HackatonList'

export function MainRoutes(){
    return (
        <BrowserRouter>
            <Route path="/dashboard" component={Dashboard} />
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