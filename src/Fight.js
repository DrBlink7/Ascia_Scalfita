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

  let monster = {
    location: location,
    userData: {
      first: "Gunnbjorn",
      last: "dell'Ascia dorata"
    }
  }

  return (
    <>
      <Head whereAreYou={match.url} />
      <div className={location}>
        <div className="body">
          <div className="userData">
            <div className="first-last">
              <div className="name">{data.data.userData.first}</div>
              <div className="last">{data.data.userData.last !== null ? data.data.userData.last : ""}</div>
            </div>
            <div className="buttons"><div className="button" onClick={() => userAction("Attacco")}>Attacco</div></div>
          </div>
          <div className="combatData">
            <div> {data.combatAction.length === 0 ? "" : data.combatAction.map(x => { return (<> {x} <br /> </>)})} </div>
          </div>
          <div className="monsterData">
            <div className="first-last">
              <div className="name">{monster.userData.first}</div>
              <div className="last">{monster.userData.last === null ? "" : monster.userData.last} </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  function userAction(action) {
    setData({
      data: data.data,
      combatAction: data.combatAction.concat(action),
      isLoading: false,
      err: ''
    })
  }

}