import axios from 'axios'

export function getUserInfo(location) {
  return axios.get("/getUserStat/" + location)
}

export function getMonsterAction(location, monster, dmg) {
  return axios.get("/getMonsterAction/" + location + "/" + monster + "/" + dmg)
}

export function isThereAFight(location) {
  return axios.get("/isThereFight/" + location)
}
