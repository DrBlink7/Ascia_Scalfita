import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, NavLink, useParams, useRouteMatch } from 'react-router-dom'
import { useState, useEffect } from "react";
import './App.css'

export function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Lorynn_Kingdom">
            <Home />
          </Route>
          <Route path="/isolaDelFaro">
            <Test />
          </Route>
          <Route path="/isolaBoschetto">
            <Prova />
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
    clickPos = "isolaBoschetto"

  }
  /**
   * x: 474 - 515
   * y: 118 - 148
   */
  else if ((x >= 474 && x <= 515) && (y >= 118 && y <= 148)) {
    clickPos = "isolaDelFaro"
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
      <Head whereAreYou={match.url}
      // temp ={clickHandler(position.x - position.posX, position.y - position.posY)} 
      />
      <div className="container">
        <div className="test-map" onClick={() => {
          history.push(clickHandler(position.x - position.posX, position.y - position.posY))
        }
        }>
          <img src="/test.png" alt="test-map"></img>
        </div>
      </div>
      <Footer position={position}/>
    </div>
  )

  function Head({whereAreYou}) {
    let location = whereAreYou.replace("/","")
    location = location.replace("_"," ")
    return (
    <div className="header">
      Ciao, benvenuto in <br />
      {location}
    </div>
    )
  }
}

function Footer({position}) {
  return (
    <div className="footer">
      <div>
        {
        isNaN(position.x - position.posX) ?
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
  )
}

function Test() {
  let history = useHistory();
  return <>
    Test
    <button onClick={() => history.goBack()}>back</button>
  </>
}

function Prova() {
  let history = useHistory();
  return <>
    Prova
    <button onClick={() => history.goBack()}>back</button>
  </>
}
