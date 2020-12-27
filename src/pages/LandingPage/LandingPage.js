import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2>This is a sandbox</h2>
      <h3>Used for testing and experimenting; this is not production level code and seriously lacks cohesion.</h3>
      <div>
        <Link to="/home">lets go!</Link>
      </div>
    </div>
  )
}
