import { View } from './service'
import './IsoleEsterne.css'

export function IsolaDelBoschetto() {
  return View("delBoschetto", "/Isola_del_Faro.png", isolaDelBoschettoClickHandler)
}

const isolaDelBoschettoClickHandler = (x, y) => {
  let clickPos = ""
  if ((x >= 0 && x <= 1) && (y >= 555 && y <= 556))
    clickPos = "something"
  else
    return ""
  return "/" + clickPos
}