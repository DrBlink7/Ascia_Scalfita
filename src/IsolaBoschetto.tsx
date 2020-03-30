import { View, clickHandler } from './service'
import { getIsolaBoschettoPosition } from './pointOfInterest'
import './css/IsoleEsterne.css'

export function IsolaDelBoschetto() {
  return View("delBoschetto", "/Isola_del_Faro.png", isolaDelBoschettoClickHandler)
}

const isolaDelBoschettoClickHandler = (x:any, y:any) => {
  let location = getIsolaBoschettoPosition()
  return clickHandler(location, x, y)
}