import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Head } from './Head'
import { getUserInfo, getMonsterAction } from './mockFights'
import { Loader } from './Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { cleanUpUrl } from './service'
import './Fight.css'

export function Fight() {
  let { location } = useParams()
  let match = useRouteMatch()
  const [data, setData] = useState({
    userData: [],
    combatAction: [],
    monsterData: [],
    monsterAction: '',
    userDmg: -1,
    turn: 1,
    combatEnded: false,
    isLoading: true,
    err: ''
  })

  useEffect(() => {
    Promise
      .all([getUserInfo(location), getMonsterAction(location, "Mostro",data.userDmg)])
      .then(([user, monsterAct]) => {
        setData({
          userData: user.data,
          combatAction: data.combatAction,
          monsterData: [],
          monsterAction: monsterAct.data.damage,
          combatEndNextT: monsterAct.data.combatEnd,
          combatEnded: data.combatEnded,
          userDmg: data.userDmg,
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
          userDmg: -1,
          turn: 0,
          isLoading: false,
          err: err
        })
      })
  }, [data.turn, location, data.combatAction, data.combatEnded,data.userDmg])

  if (data.isLoading)
    return <Loader />

  let user = {
    location: location,
    userData: {
      first: "Gunnbjorn",
      last: "Dell'ascia dorata",
      image: "/character/DolmenZarkanan.png"
    },
    userSkill: {
      skills: [
        {
          label: "Attacco",
          weaponName: "Battle Axe",
          weaponDmg: 1
        },
        {
          label: "Special",
          weaponName: "Battle Axe",
          weaponDmg: 3
        },
        {
          label: "Daily",
          weaponName: "Battle Axe",
          weaponDmg: 10
        }
      ]
    }
  }
  let style = {
    'alignContent': 'center',
    'textAlign' : 'center'
  }

  console.log("asd: ",data.userDmg)

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
            <div className={data.combatEnded ? "button back" : "hidden"} onClick={() => backBtn(data)}>
            <FontAwesomeIcon icon={faBackward} style={style}/><span className="back-ico"> Torna a {cleanUpUrl(location)}</span>
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
                          row.map((r, y) => {
                            return (
                              <span key={y}>
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
    let userResponse = "Turn: " + data.turn + "\n" + username + " effettua " + action.label + " con " + action.weaponName + " causando " + dmg + dmgLabel
    let response = userResponse + "\n" + data.userData.userData.first + " causa " + data.monsterAction + " danni"

    setDmg(action.weaponDmg,location,"Mostro")


    setData({
      userData: data.userData,
      combatAction: data.combatAction.concat(response),
      monsterData: [],
      monsterAction: data.monsterAction,
      combatEndNextT: data.combatEndNextT,
      combatEnded: data.combatEndNextT ? true : false,
      userDmg: action.weaponDmg,
      turn: data.turn + 1,
      isLoading: false,
      err: ''
    })
  }

  function setDmg(dmg,location,monsterName) {
    fetch('/userDmg/'+location+'/'+monsterName, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        dmg
      )
    })
  }

}

function backBtn(data){
  console.log("salva dati combattimento?")
  console.log(data)
  window.history.back()
}
