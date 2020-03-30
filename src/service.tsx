import React from 'react'
import { useState, useEffect } from "react"
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Head } from './Head'
import { Footer } from './Footer'
import { isThereAFight } from './mockFights'
import { Loader } from './Loader'

export function cleanUpUrl(whereAreYou:any) {
  let location = whereAreYou.replace(/_/gi, " ")
  let locations = location.split("/")
  return locations
}

export function convertToUrl(path:any) {
  return path.replace(/ /gi, "_")
}

export function getLocationName(url:any){
  let location = cleanUpUrl(url)
  return location[location.length-1]
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, e: '', posX: 0, posY: 0 })
  useEffect(() => {
    const setFromEvent = (e:any) => {
      setPosition({ x: e.clientX, y: e.clientY, e: e, posX: e.target.x, posY: e.target.y })
    }
    window.addEventListener("mousemove", setFromEvent)
    return () => {
      window.removeEventListener("click", setFromEvent)
    }
  }, [])
  return position
}

export function View(containerColor:any, mapSrc:any, handlerName:any) {
  let position = useMousePosition()
  let history = useHistory()
  let match = useRouteMatch()
  const [fight, setFight] = useState({
    isOn: false,
    isLoading: true,
    error: ''
  })

  useEffect(() => {
    let location = cleanUpUrl(match.url)
    isThereAFight(convertToUrl(location[location.length - 1]))
      .then(result => {
        setFight({
          isOn: result.data,
          isLoading: false,
          error: ''
        })
      })
      .catch(err => setFight({
        isOn: false,
        isLoading: false,
        error: err
      }))
  }, [match.url])

  if (fight.isLoading)
    return <Loader />

  if (fight.isOn)
    history.push(match.url + '/fight')

  return (
    <div className={containerColor}>
      <Head whereAreYou={match.url} />
      <div className="container">
        <div className="map" onClick={() => {
          history.push(match.path + handlerName(position.x - position.posX, position.y - position.posY))
        }}>
          <img src={mapSrc} alt={mapSrc}></img>
        </div>
      </div>
      <Footer position={position} label={getLocationName(handlerName(position.x - position.posX, position.y - position.posY))}/>
    </div>)
}

export function clickHandler(location:any, x:any, y:any) {
  let newLocation = ""
  location.forEach((loc:any) => {
    if ((x >= loc.xMin && x <= loc.xMax) && (y >= loc.yMin && y <= loc.yMax))
      newLocation = "/" + loc.label
  })
  if (!newLocation || newLocation.length === 0)
    return ""
  return newLocation
}

export function empty() {
  return ""
}