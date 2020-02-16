import { View, clickHandler } from './service'
import { getIsolaFaroPosition } from './pointOfInterest'
import './IsoleEsterne.css'

export function IsolaDelFaro() {
  return View("delFaro", "/Isola_del_Faro.png", isolaDelFaroClickHandler)
}

const isolaDelFaroClickHandler = (x, y) => {
  let location = getIsolaFaroPosition()
  return clickHandler(location, x, y)
}