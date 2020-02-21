import React from 'react'
import { cleanUpUrl, convertToUrl } from "./service"
import { NavLink } from 'react-router-dom'
import './Header.css'
export function Head({ whereAreYou }) {
  let locations = cleanUpUrl(whereAreYou)
  const fight = locations[locations.length - 1].toLowerCase().localeCompare("fight") === 0
  const header = fight ? "" : <div>Ciao, benvenuto a {locations[locations.length - 1]}</div>
  let path = ""
  return (
    <div className="header">
      { header}
      {
        fight ? <div className ={locations[locations.length-2]}>
          Un nemico ti sorprende alle spalle mentre attraversi {locations[locations.length-2]}
        </div> : // eslint-disable-next-line
        locations.map((button, index) => {
          if (index !== 0 && index !== locations.length - 1) {
            path += "/" + button
            path = convertToUrl(path)
            return <div key={index}>Torna a <NavLink to={`${path}`} className="link">{button}</NavLink></div>
          }
        })}
    </div>
  )
}