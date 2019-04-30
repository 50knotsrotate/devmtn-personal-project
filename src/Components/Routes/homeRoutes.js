import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home'
import Brewery from '../Brewery/Brewery';
import Notifications from '../Notifications/Notifications'

export default (
    <Switch>
        <Route  path = '/breweries/:id' component = {Brewery} /> 
        <Route  path = '/notifications' component = {Notifications} /> 
    </Switch>
)