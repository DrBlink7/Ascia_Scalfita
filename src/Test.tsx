import React from 'react'
import { Head } from './Head'
import { useRouteMatch } from 'react-router-dom'
import './Test.css'

type text = string

export const Test = () => {
    let blbl:text = "asdffgn"
    console.log("passo:",blbl)
    return (
    <div className="col">
        <Head whereAreYou={useRouteMatch().url}/>
        <Body str={blbl}/>
    </div>
    )
}

const Body : React.FC<{str:text}> = (str) => {
    console.log("arriva",str)
    return (
        <span>
            stringa = 
            {/* '{str}' */}
        </span>
    )
}