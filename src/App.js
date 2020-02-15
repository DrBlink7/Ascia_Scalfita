import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useState, useEffect } from "react";
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

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 ,e: '',posX:0,posY:0});
  useEffect(() => {
    const setFromEvent = e => {
    setPosition({ x: e.clientX, y: e.clientY ,e: e, posX: e.target.x, posY: e.target.y});
    }
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);
  return position;
};

function clickHandler(position){
  console.log(position.x-position.posX,position.y-position.posY)
}

function Home() {
  let position = useMousePosition();
  let x = isNaN(position.x-position.posX) ? position.x-position.posX : 0
  let y = isNaN(position.y-position.posY) ? position.y-position.posY : 0
  return (
    <div className="App">
    <div className="header">head</div>
  <div className="container">
    <div className="test-map" onClick={() => clickHandler(position)}>
      <img src="/test.png" alt = "test-map"></img>
    </div>
  </div>
  <div className="footer"><div>
      {position.x-position.posX}:{position.y-position.posY}<br />
      {x}:{y}
    </div></div>
  </div>
  )
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