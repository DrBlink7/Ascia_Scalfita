import axios from 'axios'

export function getUserInfo(location){
  return axios.get("/getUserStat/"+location)
}

export function getMonsterAction(location,monster){
  return axios.get("/getMonsterAction/"+location+"/"+monster)
}
