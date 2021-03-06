import React from 'react';
import {Switch} from 'react-router-dom';


import Route from './Route';


import SignIn from './../pages/signin'

import SignUp from './../pages/signup'

import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard/index';


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SignIn} exact/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/forgot-password" component={ForgotPassword}/>
    <Route path="/reset-password" component={ResetPassword}/>

    <Route path="/dashboard" component={Dashboard} isPrivate/>
  </Switch>
)

export default Routes;
