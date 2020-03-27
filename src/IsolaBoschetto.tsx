import { View, clickHandler } from './service'
import { getIsolaBoschettoPosition } from './pointOfInterest'
import './IsoleEsterne.css'

export function IsolaDelBoschetto() {
  return View("delBoschetto", "/Isola_del_Faro.png", isolaDelBoschettoClickHandler)
}

const isolaDelBoschettoClickHandler = (x, y) => {
  let location = getIsolaBoschettoPosition()
  return clickHandler(location, x, y)
}