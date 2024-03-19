import './scss/index.scss'
import Grid from './components/Grid'
import Header from './components/Header'
import Setter from './components/Setter'

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
