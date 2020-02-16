import React from 'react'
import { useState, useEffect } from "react"
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Head } from './Head'
import { Footer } from './Footer'

export function cleanUpUrl(whereAreYou) {
  let location = whereAreYou.replace(/\//gi, ' ')
  location = location.replace(/_/gi, " ")
  return location
}

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, e: '', posX: 0, posY: 0 })
  useEffect(() => {
    const setFromEvent = e => {
      setPosition({ x: e.clientX, y: e.clientY, e: e, posX: e.target.x, posY: e.target.y })
    }
    window.addEventListener("mousemove", setFromEvent)
    return () => {
      window.removeEventListener("click", setFromEvent)
    }
  }, [])
  return position
}

export function View(containerColor, mapSrc, handlerName) {
  let position = useMousePosition()
  let history = useHistory()
  let match = useRouteMatch()
  return (
    <div className={containerColor}>
      <Head whereAreYou={match.url} />
      {
        match.url === "/Lorynn_Kingdom" ? "" :
          <button onClick={() => history.goBack()}>back</button>
      }
      <div className="container">
        <div className="map" onClick={() => {
          history.push(match.path + handlerName(position.x - position.posX, position.y - position.posY))
        }}>
          <img src={mapSrc} alt={mapSrc}></img>
        </div>
      </div>
      <Footer position={position} />
    </div>)
}

export function clickHandler(location, x, y) {
  let newLocation = ""
  location.forEach(loc => {
    if ((x >= loc.xMin && x <= loc.xMax) && (y >= loc.yMin && y <= loc.yMax))
      newLocation = "/" + loc.label
  })
  if (!newLocation || newLocation.length === 0)
    return ""
  return newLocation
}

export function empty (){
  return ""
}