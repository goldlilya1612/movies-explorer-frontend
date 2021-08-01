import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    const isLoggedIn = localStorage.getItem('loggedIn');
    console.log(isLoggedIn)
    return (
        <Route>
            {() =>
                isLoggedIn ? <Component {...props}></Component> : <Redirect to='/'></Redirect>
            }
        </Route>
    );
};
  
export default ProtectedRoute; 