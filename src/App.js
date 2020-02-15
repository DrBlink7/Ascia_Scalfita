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
  const [position, setPosition] = useState({ x: 0, y: 0, e: '', posX: 0, posY: 0 });
  useEffect(() => {
    const setFromEvent = e => {
      setPosition({ x: e.clientX, y: e.clientY, e: e, posX: e.target.x, posY: e.target.y });
    }
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);
  return position;
};

function clickHandler(x, y) {
  console.log(x, y)
  let clickPos = ""
  /**
   *  y: 141 - 187
   *  x: 545 - 605
   * */
  if ((x >= 545 && x <= 605) && (y >= 141 && y <= 187))
    clickPos = "isolaBoschetto"
  /**
   * x: 474 - 515
   * y: 118 - 148
   */
  else if ((x >= 474 && x <= 515) && (y >= 118 && y <= 148)) {
    clickPos = "isolaDelFaro"
  }
  else
    clickPos = "not registered"
  console.log("hai clickato: ", clickPos)

}

function Home() {
  let position = useMousePosition();
  return (
    <div className="App">
      <div className="header">head</div>
      <div className="container">
        <div className="test-map" onClick={() => clickHandler(position.x - position.posX, position.y - position.posY)}>
          <img src="/test.png" alt="test-map"></img>
        </div>
      </div>
      <div className="footer"><div>
        {isNaN(position.x - position.posX) ?
          ""
          :
          position.x - position.posX + " : "
        }
        {
          isNaN(position.y - position.posY) ?
            ""
            :
            position.y - position.posY}
        <br />
      </div>
      </div>
    </div>
  )
}

function Test() {
  return <>
    Test
  </>
}

function Prova() {
  return <>
    Prova
  </>
}