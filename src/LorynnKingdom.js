import { View } from './service'
import { getLorynnKingdomPosition } from './mock'

export function LorynnKingdom() {
  return View("App", "/test.png", lorynnKingdomClickHandler)
}

const lorynnKingdomClickHandler = (x, y) => {
  let location = getLorynnKingdomPosition()
  return clickHandler(location, x, y)
}

function clickHandler(location, x, y) {
  let newLocation = "not registered"
  location.forEach(loc => {
    if ((x >= loc.xMin && x <= loc.xMax) && (y >= loc.yMin && y <= loc.yMax))
      newLocation = "/" + loc.label
  })
  return newLocation
}
