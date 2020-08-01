import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouterProps, Redirect} from 'react-router-dom'

import { useAuth} from './../hooks/AuthContext';

interface RouteProps extends ReactDOMRouterProps{
    isPrivate?: boolean;
    component: React.ComponentType
}




const Route: React.FC<RouteProps> =  ( { isPrivate = false, component: Component, ...rest}) =>  {
  const { user } = useAuth();



  return (
    <ReactDOMRoute
      {...rest}
      render={()=>{
          return isPrivate === !!user ? (
              <Component></Component>
          ) : (
            <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard'}}></Redirect>
          )
      }
    } />
  )


}




export default Route;