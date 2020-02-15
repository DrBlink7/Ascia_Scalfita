import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import { useState, useEffect } from "react";
import { IsolaDelFaro } from './IsolaDelFaro';
import './App.css'
import { Head } from './Head';
import { Footer } from './Footer';
import { IsolaBoschetto } from './IsolaBoschetto';

export function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/Lorynn_Kingdom">
            <Home />
          </Route>
          <Route path="/Lorynn_Kingdom/Isola_del_Faro">
            <IsolaDelFaro />
          </Route>
          <Route path="/Lorynn_Kingdom/Isola_del_Boschetto">
            <IsolaBoschetto />
          </Route>
          <Route path="/">
            <Redirect to={"/Lorynn_Kingdom"} />
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
      window.removeEventListener("click", setFromEvent);
    };
  }, []);
  return position;
};

export const clickHandler = (x, y) => {
  let clickPos = ""
  /**
   *  y: 141 - 187
   *  x: 545 - 605
   * */
  if ((x >= 545 && x <= 605) && (y >= 141 && y <= 187)) {
    clickPos = "Isola_del_Boschetto"

  }
  /**
   * x: 474 - 515
   * y: 118 - 148
   */
  else if ((x >= 474 && x <= 515) && (y >= 118 && y <= 148)) {
    clickPos = "Isola_del_Faro"
  }
  else
    clickPos = "not registered"
  return "/" + clickPos

}

function Home() {
  let position = useMousePosition()
  let history = useHistory();
  let match = useRouteMatch();

  return (
    <div className="App">
      <Head whereAreYou={match.url} />
      <div className="container">
        <div className="test-map" onClick={() => {
          history.push(match.path+clickHandler(position.x - position.posX, position.y - position.posY))
        }
        }>
          <img src="/test.png" alt="test-map"></img>
        </div>
      </div>
      <Footer position={position}/>
    </div>
  )
}
