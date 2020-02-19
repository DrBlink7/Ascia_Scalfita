import axios from 'axios'

export async function getTest(){
  return axios.get(test())
}

function test(){
  return [
    {
      id: 1,
      asdf: "msmad"
    },
    {
      id: 2,
      asdf: "msfdsfad"
    },
    {
      id: 4,
      asdf: "kidsjfi"
    },
    {
      id: 5,
      asdf: "mfie"
    }
  ]
}