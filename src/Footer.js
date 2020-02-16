import React from 'react'
export function Footer({ position }) {
  return (<div className="footer">
    <div>
      {isNaN(position.x - position.posX) ?
        ""
        :
        position.x - position.posX + " : "}
      {isNaN(position.y - position.posY) ?
        ""
        :
        position.y - position.posY}
      <br />
    </div>
  </div>)
}
