import React from 'react'
import Appbar from '../components/card'

export default function Homepage () {
  return (
    <div>
      <Appbar />
      <h1 className={'text-4xl font-bold text-center mt-16'}>Coming Soon!</h1>
      <p className={'text-center font-mono text-sm mt-2 text-gray-700'}>
        Note: This is a placeholder for when we add an actual homescreen.
      </p>
    </div>
  )
}
