import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home'
import Brewery from '../Brewery/Brewery'

export default (
    <Switch>
        <Route  path = '/breweries/:id' component = {Brewery} /> 
    </Switch>
)