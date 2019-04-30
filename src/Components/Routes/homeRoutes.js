import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Brewery from '../Brewery/Brewery';
import Store from '../Store/Store';
import Notifications from '../Notifications/Notifications';

export default (
    <Switch>
        <Route  path = '/breweries/:id' component = {Brewery} /> 
        <Route  path = '/notifications' component = {Notifications} /> 
        <Route  path = '/store' component = {Store} /> 
    </Switch>
)