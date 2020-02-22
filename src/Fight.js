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
    userData: [],
    combatAction: [],
    monsterData: [],
    monsterAction: false,
    isLoading: true,
    err: ''
  })

  useEffect(() => {
    getUserInfo(location)
      .then(result => setData({
        userData: result.data,
        combatAction: [],
        monsterData: [],
        monsterAction: false,
        isLoading: false,
        err: ''
      }))
      .catch(err => {
        setData({
          userData: [],
          combatAction: [],
          monsterData: [],
          monsterAction: false,
          isLoading: false,
          err: err
        })
      })
  }, [location])

  if (data.isLoading)
    return <Loader />

  let weaponDmg1 = 1, weaponDmg2 = 3, weaponDmg3 = 10
  let imgPath = "/character/DolmenZarkanan.png"

  let user = {
    location: location,
    userData: {
      first: "Gunnbjorn",
      last: "Dell'ascia dorata",
      image: imgPath
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
        }
      ]
    }
  }

  return (
    <>
      <Head whereAreYou={match.url} />
      <div className={location}>
        <div className="body">
          <div className="userData">
            <div className="detail">
              <div className="first">
                {user.userData.first}
              </div>
              <div className="center">
                {user.userData.last !== null ? data.userData.userData.last : ""}
              </div>
              <div className="last">
                <img src={user.userData.image} alt="charImg" />
              </div>
            </div>
            <div className="buttons">
              {
                user.userSkill.skills.map((button, i) => {
                  return (
                    <div key={i}>
                      <div className="button" onClick={() => userAction(user.userData.first, button)}>{button.label}</div>
                      <div className="spaced" />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="combatData">
            <div>
              {
                data.combatAction.length === 0 ? "" :
                  data.combatAction.slice(0).reverse().map((x, i) => {
                    return (
                      <span key={i}>
                        {x} <hr className="hr" key={i} />
                      </span>
                    )
                  })
              }
            </div>
          </div>
          <div className="monsterData">
            <div className="monsterDetail">
              <div className="name">{data.userData.userData.first}</div>
              <div className="last">{data.userData.userData.last === null ? "" : data.userData.userData.last} </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  function userAction(username, action) {
    let dmgLabel = action.weaponDmg > 1 ? " danni" : " danno"
    let dmg = action.weaponDmg >= 0 ? action.weaponDmg : "nessun"
    let response = username + " effettua " + action.label + " con " + action.weaponName + " causando " + dmg + dmgLabel

    setData({
      userData: data.userData,
      combatAction: data.combatAction.concat(response),
      monsterData: [],
      monsterAction: false,
      isLoading: false,
      err: ''
    })
  }

}