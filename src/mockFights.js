import axios from 'axios'

export function getTest(name,surname,location){
  return axios.get("/test/"+name+"/"+surname+"/"+location)
}
