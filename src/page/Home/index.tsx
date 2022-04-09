//HashRouter  (./router/index.tsx)
import React, { Component } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Calendar from '../calendar'
import Trende from '../trende'

export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Trende}></Route>
          <Route path="/trending" exact component={Trende}></Route>
          <Route path="/calendar" exact component={Calendar}></Route>
        </Switch>
      </HashRouter>
    )
  }
}
