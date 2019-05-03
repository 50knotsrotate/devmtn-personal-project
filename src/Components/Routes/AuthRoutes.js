import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

export default (
    <Switch>
        <Route path='/signUp' component={SignUp} />
        <Route exact path='/' component={SignIn} />
    </Switch>
)