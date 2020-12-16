/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))
const About = lazy(() => import('../pages/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const ToDo = lazy(() => import('../pages/ToDo'))
const TechnologiesGraph = lazy(() => import('../pages/TechnologiesGraph'))


const routes = [
  <UnauthorizedRoute path="/signin" redirectTo="/" exact component={SignIn} />,
  <UnauthorizedRoute path="/signup" redirectTo="/" exact component={SignUp} />,
  // <UnauthorizedRoute path="/technologies_graph" redirectTo="/technologies_graph" exact component={TechnologiesGraph} />,

  <UnauthorizedRoute
    path="/password_reset"
    redirectTo="/"
    exact
    component={PasswordReset}
  />,
  <Route path="/about" exact component={About} />,
  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/to_do" exact component={ToDo} />,
  <AuthorizedRoute path="/technologies_graph" exact component={TechnologiesGraph} />,
]

export default routes