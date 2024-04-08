import React from 'react'
import './scss/index.scss'
import Grid from './components/Grid.tsx'
import Header from './components/Header.tsx'
import Setter from './components/Setter.tsx'

const App = () => {
  return (
    <div className='appWrapper'>
      <div className='appContainer'>
        <Header />
        <Setter />
        <Grid />
      </div>
    </div>
  )
}

export default App
