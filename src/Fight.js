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
    test: [],
    isLoading: true,
    err: ''
  })

  useEffect(() => {
    getTest()
      .then(result => setData({
        test: result.data,
        isLoading: false,
        err: ''
      })
        .catch(err => {
          setData({
            test: [],
            isLoading: false,
            err: err
          })
        })
      )
  }, [])

  if (data.isLoading)
    return <Loader />


  console.log(location)
  return (
    <div>
      <Head whereAreYou={match.url} />
      <div className="Le_Grandi_Scogliere">

      </div>
    </div>
  )
}