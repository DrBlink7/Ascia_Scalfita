import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Head } from "./Head";
import './Isole.css';

export function IsolaDelFaro() {
  let history = useHistory();
  let match = useRouteMatch();

  return (
  <div className="delFaro">
    <Head whereAreYou={match.url} />
    Test
    <button onClick={() => history.goBack()}>back</button>
  </div>)
}
