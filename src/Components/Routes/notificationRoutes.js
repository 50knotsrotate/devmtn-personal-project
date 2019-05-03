import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Comments from '../Comments/Comments';
import Notifications from '../Notifications/Notifications'

export default (
    <Switch>
        <Route exact path='/notifications' component={Notifications} />
        <Route path='/users/:username/comments' component={Comments} />
    </Switch>
)
