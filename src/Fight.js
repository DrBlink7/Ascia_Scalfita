import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Head } from './Head'
import { getUserInfo } from './mockFights'
import { cleanUpUrl } from './service'
import { Loader } from './Loader'
import './Fight.css'

export function Fight() {
  let { location } = useParams()
  let match = useRouteMatch()
  const [data, setData] = useState({
    data: [],
    isLoading: true,
    err: ''
  })

  useEffect(() => {
    getUserInfo(location)
      .then(result => setData({
        data: result.data,
        isLoading: false,
        err: ''
      }))
      .catch(err => {
        setData({
          data: [],
          isLoading: false,
          err: err
        })
      })
  }, [location])

  if (data.isLoading)
    return <Loader />

  console.log(data.data)
  let arr = {
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
          <div className="usedData">
            <div className="name">{arr.userData.first}</div>
            <div className="last">{arr.userData.last}</div>
          </div>
          <div className="combatData">
            <div>
              combat state
            </div>
          </div>
          <div className="monsterData">
            <div className="name">{arr.userData.first}</div>
            <div className="last">{arr.userData.last}</div>
          </div>
        </div>
      </div>
    </>
  )
}