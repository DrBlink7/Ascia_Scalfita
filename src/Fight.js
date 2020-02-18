import React from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Head } from './Head'
import './Fight.css'

export function Fight(){
    let { location } = useParams()
    let match = useRouteMatch()
    
    console.log(location)
    return (
    <div>
    <Head whereAreYou={match.url} />
    <div className="Le_Grandi_Scogliere">
        lolle
    </div>
    </div>
    )
}