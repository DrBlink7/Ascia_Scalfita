import axios from 'axios'

export function getUserInfo(location:any) {
  return axios.get("/getUserStat/" + location)
}

export function getMonsterAction(location:any, monster:any, dmg:any) {
  return axios.get("/getMonsterAction/" + location + "/" + monster + "/" + dmg)
}

export function isThereAFight(location:any) {
  return axios.get("/isThereFight/" + location)
}
