import { View } from './service'
import './IsoleEsterne.css'

export function IsolaDelFaro() {
  return View("delFaro", "/Isola_del_Faro.png", isolaDelFaroClickHandler)
}

const isolaDelFaroClickHandler = (x, y) => {
  let clickPos = ""
  if ((x >= 0 && x <= 1) && (y >= 555 && y <= 556))
    clickPos = "something"
  else
    return ""
  return "/" + clickPos
}