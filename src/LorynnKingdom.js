import { View } from './service';

export function LorynnKingdom(){
  return View("App","/test.png",LorynnKingdomClickHandler)
}


export const LorynnKingdomClickHandler = (x, y) => {
  let clickPos = ""
  /**
   *  y: 141 - 187
   *  x: 545 - 605
   * */
  if ((x >= 545 && x <= 605) && (y >= 141 && y <= 187)) {
    clickPos = "Isola_del_Boschetto"
  }
  /**
   * x: 474 - 515
   * y: 118 - 148
   */
  else if ((x >= 474 && x <= 515) && (y >= 118 && y <= 148)) {
    clickPos = "Isola_del_Faro"
  }
  else
    clickPos = "not registered"
  return "/" + clickPos
}