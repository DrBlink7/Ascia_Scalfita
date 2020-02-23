import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Head } from './Head'
import { getUserInfo, getMonsterAction } from './mockFights'
import { Loader } from './Loader'
import './Fight.css'

export function Fight() {
  let { location } = useParams()
  let match = useRouteMatch()
  const [data, setData] = useState({
    userData: [],
    combatAction: [],
    monsterData: [],
    monsterAction: '',
    turn: 1,
    combatEnded: false,
    isLoading: true,
    err: ''
  })

  useEffect(() => {
    Promise
      .all([getUserInfo(location), getMonsterAction(location,"Mostro")])
      .then(([user, monsterAct]) => {
        setData({
          userData: user.data,
          combatAction: data.combatAction,
          monsterData: [],
          monsterAction: monsterAct.data.damage,
          combatEndNextT: monsterAct.data.combatEnd, 
          combatEnded: data.combatEnded,
          turn: data.turn,
          isLoading: false,
          err: ''
        })
      })
      .catch(err => {
        setData({
          userData: [],
          combatAction: [],
          monsterData: [],
          monsterAction: '',
          combatEndNextT: false,
          combatEnded: false,
          turn: 0,
          isLoading: false,
          err: err
        })
      })
  }, [data.turn,location,data.combatAction,data.combatEnded])

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
                <div className="skillLabel">{user.userData.first}</div>
                <div className="skillLabel">{user.userData.first}</div>
                <div className="skillLabel">{user.userData.first}</div>
                <div className="skillLabel">{user.userData.first}</div>
              </div>
              <div className="center">
                <div className="skillValue">{user.userData.last !== null ? user.userData.last : ""}</div>
                <div className="skillValue">{user.userData.first}</div>
                <div className="skillValue">{user.userData.first}</div>
              </div>
              <div className="last">
                <div className="img"><img src={user.userData.image} alt="charImg" /></div>
                <div className="skillValue">{user.userData.first}</div>
                <div className="skillValue">{user.userData.first}</div>
                <div className="skillValue">{user.userData.first}</div>
              </div>
            </div>
            <div className={data.combatEnded ? "hidden" : "buttons"}>
              {
                user.userSkill.skills.map((button, i) => {
                  return (
                    <div key={i}>
                      <div className="spaced" />
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
                    let row = x.split("\n")
                    return (
                      <span key={i}>
                        {
                          row.map((r,y)=>{
                            return(
                            <span key = {y}>
                            {r}
                            <br />
                            </span>
                            )
                          })
                        }
                        <hr className="hr" key={i} />
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
    let userResponse = "Turn: "+data.turn+"\n"+username + " effettua " + action.label + " con " + action.weaponName + " causando " + dmg + dmgLabel
    let response = userResponse+"\n"+data.userData.userData.first+" causa "+data.monsterAction+ " danni"

    setData({
      userData: data.userData,
      combatAction: data.combatAction.concat(response),
      monsterData: [],
      monsterAction: data.monsterAction,
      combatEndNextT: data.combatEndNextT,
      combatEnded: data.combatEndNextT ? true : false,
      turn: data.turn+1,
      isLoading: false,
      err: ''
    })

  }

}