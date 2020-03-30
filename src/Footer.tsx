import React from 'react'

export function Footer({ label }:any) {
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
