import React from 'react'

export function Footer({ position, label }) {
  return (
  <div className="footer">
    {
    label === "" ? "" : 
    <div>Vai a '
      {
        label
      }' ?
    </div>
    }
  </div>
  )
}
