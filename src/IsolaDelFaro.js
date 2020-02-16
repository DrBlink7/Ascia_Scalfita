import { View, clickHandler, empty } from './service'
import { getIsolaFaroPosition } from './pointOfInterest'
import './IsoleEsterne.css'

export function IsolaDelFaro() {
  return View("delFaro", "/Isola_del_Faro.png", isolaDelFaroClickHandler)
}

const isolaDelFaroClickHandler = (x, y) => {
  let location = getIsolaFaroPosition()
  return clickHandler(location, x, y)
}

export function Scogliere(){
  return View("delFaro","/Cliffs.png",empty)
}