import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Head } from './Head'
import { getTest } from './mockFights'
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
    getTest("asd", "fasd", location)
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

  return (
    <div>
      <Head whereAreYou={match.url} />
      <div className="Le_Grandi_Scogliere">
        
          <span>{data.data.location}</span>
          <div>
          {
            data.data.userData.map(z=>{
              return <><span>{z.first}</span>
              <span>{z.last}</span></>
            })
            
          }</div>

        
      </div>
    </div>
  )
}