import React from 'react'
import {Navbar} from './components'
import QueryTest from './components/query-test'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <QueryTest />
    </div>
  )
}

export default App
