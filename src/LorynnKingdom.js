import { View, clickHandler } from './service'
import { getLorynnKingdomPosition } from './pointOfInterest'

export function LorynnKingdom() {
  return View("App", "/test.png", lorynnKingdomClickHandler)
}

const lorynnKingdomClickHandler = (x, y) => {
  let location = getLorynnKingdomPosition()
  return clickHandler(location, x, y)
}
