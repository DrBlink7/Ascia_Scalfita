import React from 'react'
import { cleanUpUrl } from "./service"
export function Head({ whereAreYou }) {
  let location = cleanUpUrl(whereAreYou)
  return (<div className="header">
    Ciao, benvenuto in <br />
    {location}
  </div>)
}
