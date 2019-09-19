import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'

import Hackatons from './components/Hackatons'

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
            <Route path="/dashboard/hackatons" component={Hackatons} />
        </>
    )
}