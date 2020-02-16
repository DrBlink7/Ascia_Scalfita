import React from 'react'
import { cleanUpUrl, convertToUrl } from "./service"
import { NavLink } from 'react-router-dom'
import './App.css'
export function Head({ whereAreYou }) {
  let locations = cleanUpUrl(whereAreYou)
  let path = ""
  return (
    <div className="header">
      Ciao, benvenuto a {locations[locations.length - 1]}<br />
      {
        locations.map((button, index) => {
          if (index !== 0 && index !== locations.length - 1) {
            path += "/" + button
            path = convertToUrl(path)
            return <div>Torna a <NavLink to={`${path}`} className="link">{button}</NavLink></div>
          }
        })}
    </div>
  )
}