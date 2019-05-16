import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Brewery from '../Brewery/Brewery';
import Breweries from '../Breweries/Breweries'
import Store from '../Store/Store';
import Notifications from '../Notifications/Notifications';
import Homepage from '../Homepage/Homepage';
import Profile from '../Profile/Profile';

export default (
    <Switch>
        <Route exact path='/home' component={Homepage}/>
        <Route path='/users/:id' component={Profile}/>
        <Route path = '/breweries/:id' component = {Brewery} /> 
        <Route path = '/notifications' component = {Notifications} /> 
        <Route path = '/store' component = {Store} /> 
    </Switch>
)