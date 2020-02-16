import { View } from './service'

export function LorynnKingdom(){
  return View("App","/test.png",lorynnKingdomClickHandler)
}


const lorynnKingdomClickHandler = (x, y) => {
  let clickPos = ""
  /**
   * x: 696 - 775
   * y: 153 - 210
   * */
  if ((x >= 696 && x <= 775) && (y >= 153 && y <= 210)) {
    clickPos = "Isola_del_Boschetto"
  }
  /**
   * x: 604 - 661
   * y: 123 - 161
   */
  else if ((x >= 604 && x <= 661) && (y >= 123 && y <= 161)) {
    clickPos = "Isola_del_Faro"
  }
  else
    clickPos = "not registered"
  return "/" + clickPos
}