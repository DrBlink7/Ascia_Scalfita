import React from 'react';
import { useHistory } from 'react-router-dom';
export function IsolaBoschetto() {
  let history = useHistory();
  return <>
    Prova
    <button onClick={() => history.goBack()}>back</button>
  </>;
}
