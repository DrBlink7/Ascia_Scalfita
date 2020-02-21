import axios from 'axios'

export function getUserInfo(location){
  return axios.get("/getUserStat/"+location)
}
