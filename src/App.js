import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

export function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/prova">
          <Prova />
        </Route>
        <Route path="/">
          <Redirect to={"/Home"} />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

function Home(){
  return <>
    Home
  </>
}

function Test(){
  return <>
    Test
  </>
}

function Prova(){
  return <>
    Prova
  </>
}