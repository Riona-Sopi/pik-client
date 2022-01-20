import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';


const PrivateRoute = ({ component: Component, layout: Layout, ...rest}) => (
    <Route 
    {...rest}
    render={props => localStorage.getItem("token") ?(
        <Layout>
            <Component {...props}/>
        </Layout>
    ) : (
        <Redirect 
        to={{
            pathname: "/loginform",
            state: {from: props.location}
        }}
        />
    )}
    />
)



export default PrivateRoute