import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Head } from './Head';
import { Footer } from './Footer';
import { useMousePosition } from './service';

export function LorynnKingdom() {
  let position = useMousePosition();
  let history = useHistory();
  let match = useRouteMatch();
  return (<div className="App">
    <Head whereAreYou={match.url} />
    <div className="container">
      <div className="test-map" onClick={() => {
        history.push(match.path + LorynnKingdomClickHandler(position.x - position.posX, position.y - position.posY));
      }}>
        <img src="/test.png" alt="test-map"></img>
      </div>
    </div>
    <Footer position={position} />
  </div>);
}

export const LorynnKingdomClickHandler = (x, y) => {
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