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

  console.log(data.data)
  let monster = {
    location: location,
    userData: {
      first: "Gunnbjorn",
      last: "dell'Ascia dorata"
    }
  }

  let testCmb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur egestas lacus a est placerat porta. Duis iaculis blandit lacus iaculis sollicitudin. Nunc sed lorem quis mauris faucibus varius sit amet vitae libero. Sed placerat suscipit malesuada. Pellentesque leo nibh, feugiat et urna vitae, faucibus molestie lectus. Nullam scelerisque metus eu ex cursus sagittis. Aenean non elit in libero pretium accumsan. Mauris ornare at felis id placerat. Mauris a accumsan libero, in feugiat est."+
  "Vivamus et lacus non diam semper finibus ut eu lorem. Vestibulum venenatis id nibh vitae iaculis. Aliquam tempus dolor eu justo luctus lacinia. Aliquam dictum, eros ac mollis accumsan, sapien mauris tempor nisi, et imperdiet est neque at odio. Fusce non leo magna. Curabitur pharetra enim orci, id placerat justo lacinia sit amet. Nam quis dui commodo, imperdiet diam non, pellentesque lorem. Nulla facilisi. Etiam ipsum est, finibus vitae congue eu, rutrum vitae ipsum. Cras feugiat dapibus felis auctor tincidunt. Aenean aliquet cursus commodo. Vestibulum a posuere eros."+
  "Proin faucibus, ex quis pharetra hendrerit, leo tellus faucibus erat, eget aliquam elit eros in est. Suspendisse viverra elit tempus velit hendrerit condimentum. Vestibulum a mi at diam rhoncus volutpat. Nullam laoreet at ante id posuere. Mauris eu est ut mi convallis pellentesque. Ut vulputate purus eget risus congue congue. Nullam facilisis est a luctus semper. Praesent arcu libero, posuere ac velit vitae, dignissim feugiat ex. Donec ultricies metus non neque blandit, ac gravida elit vehicula. Etiam pharetra purus pretium mauris fringilla consectetur. Nunc a mollis mauris, non consectetur sem. Vestibulum mattis arcu placerat, feugiat justo viverra, porttitor mi."+
  "Aliquam at purus vitae mauris molestie interdum non at dui. Etiam sit amet commodo orci. Morbi ornare elementum egestas. Curabitur consequat ipsum ac mi viverra vestibulum. In et efficitur tellus. Maecenas suscipit laoreet orci, eu pharetra tellus ornare viverra. Donec feugiat viverra nibh quis dignissim."+
  "Etiam sapien elit, fermentum ut consectetur vel, efficitur at velit. Pellentesque tempus ornare interdum. Nunc quis tempor lectus, ac vestibulum purus. Suspendisse venenatis tellus eu velit condimentum, at elementum odio gravida. Sed aliquam facilisis neque. Nunc sit amet dictum tortor. Quisque vitae est aliquam nisl fringilla euismod. Mauris erat sem, scelerisque eu justo ac, pretium hendrerit ipsum. Donec efficitur tincidunt semper. Vivamus at feugiat ipsum, at euismod sem. Curabitur malesuada, odio non tristique eleifend, tortor ipsum rhoncus tellus, eu condimentum magna lectus vel nulla. Duis a purus sollicitudin, posuere neque non, sollicitudin nibh. Sed tristique molestie auctor. Maecenas scelerisque dapibus varius. Vestibulum non tempus quam, eu viverra nulla. Curabitur tempus ornare est, et sagittis lacus vehicula ac. "

  return (
    <>
      <Head whereAreYou={match.url} />
      <div className={location}>
        <div className="body">
          <div className="usedData">
            <div className="name">{data.data.userData.first}</div>
            <div className="last">{data.data.userData.last}</div>
          </div>
          <div className="combatData">
            {testCmb}
          </div>
          <div className="monsterData">
            <div className="name">{monster.userData.first}</div>
            <div className="last">{monster.userData.last}</div>
          </div>
        </div>
      </div>
    </>
  )
}