import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Head } from './Head'
import { getUserInfo } from './mockFights'
import { Loader } from './Loader'
import './Fight.css'

export function Fight() {
  let { location } = useParams()
  let match = useRouteMatch()
  const [data, setData] = useState({
    data: [],
    combatAction: [],
    isLoading: true,
    err: ''
  })

  useEffect(() => {
    getUserInfo(location)
      .then(result => setData({
        data: result.data,
        combatAction: [],
        isLoading: false,
        err: ''
      }))
      .catch(err => {
        setData({
          data: [],
          combatAction: [],
          isLoading: false,
          err: err
        })
      })
  }, [location])

  if (data.isLoading)
    return <Loader />

  let weaponDmg1 = 1,weaponDmg2 = 3,weaponDmg3 = 10

  let user = {
    location: location,
    userData: {
      first: "Gunnbjorn",
      last: "Dell'ascia dorata"
    },
    userSkill: {
      skills: [
        {
          label: "Attacco",
          weaponName: "Battle Axe",
          weaponDmg: weaponDmg1
        },
        {
          label: "Special",
          weaponName: "Battle Axe",
          weaponDmg: weaponDmg2
        },
        {
          label: "Daily",
          weaponName: "Battle Axe",
          weaponDmg: weaponDmg3
        }]
    }
  }

  return (
    <>
      <Head whereAreYou={match.url} />
      <div className={location}>
        <div className="body">
          <div className="userData">
            <div className="detail">
              <div className="name">{user.userData.first}</div>
              <div className="last">{user.userData.last !== null ? data.data.userData.last : ""}</div>
            </div>
            <div className="buttons">
              {
                user.userSkill.skills.map(button => {
                  return <div className="button" onClick={() => userAction(user.userData.first,button)}>{button.label}</div>
                })
              }
            </div>
          </div>
          <div className="combatData">
            <div> {data.combatAction.length === 0 ? "" : data.combatAction.map(x => { return (<> {x} <hr className="hr" /> </>) })} </div>
          </div>
          <div className="monsterData">
            <div className="monsterDetail">
              <div className="name">{data.data.userData.first}</div>
              <div className="last">{data.data.userData.last === null ? "" : data.data.userData.last} </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  function userAction(username,action) {
    let dmgLabel = action.weaponDmg >1 ? " danni" : " danno"
    let dmg = action.weaponDmg >= 0 ? action.weaponDmg : "nessun"
    let response = username+" effettua "+action.label+" con "+action.weaponName+" causando "+dmg+dmgLabel
    
    setData({
      data: data.data,
      combatAction: data.combatAction.concat(response),
      isLoading: false,
      err: ''
    })
  }

}