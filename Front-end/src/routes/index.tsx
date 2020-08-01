import React from 'react';
import {Switch} from 'react-router-dom';


import Route from './Route';


import SignIn from './../pages/signin'

import SignUp from './../pages/signup'

import Dashboard from '../pages/Dashboard/index';


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SignIn} exact/>
    <Route path="/signup" component={SignUp}/>


    <Route path="/dashboard" component={Dashboard} isPrivate/>
  </Switch>
)

export default Routes;
