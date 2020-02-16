import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { IsolaDelFaro } from './IsolaDelFaro';
import { IsolaDelBoschetto } from './IsolaBoschetto';
import { LorynnKingdom } from './LorynnKingdom';
import './App.css'

export function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/Lorynn_Kingdom">
            <LorynnKingdom />
          </Route>
          <Route exact path="/Lorynn_Kingdom/Isola_del_Faro">
            <IsolaDelFaro />
          </Route>
          <Route exact path="/Lorynn_Kingdom/Isola_del_Boschetto">
            <IsolaDelBoschetto />
          </Route>
          <Route path="/">
            <Redirect to={"/Lorynn_Kingdom"} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}