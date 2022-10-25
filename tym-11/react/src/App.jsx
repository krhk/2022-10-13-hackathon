import { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import CurrentState from './sections/currentState/currentState'
import Landing from './sections/landing/landing'
import MostWanted from './sections/mostWanted/mostWanted'
import PlannedRepairs from './sections/plannedRepairs/plannedRepairs'
import Requests from './sections/requests/requests'
import Footer from './footer/footer'

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";


function Opravy(){
  return (
    <p>sldfkj</p>
  )
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='*' element="nic" />
        <Route path='/' element={
          <>
          <Landing />
          <CurrentState />
          <PlannedRepairs />
          <Requests />
          {/* <MostWanted /> */}
          <Footer />
        </>
        } />
        <Route path='/opravy' element={<Opravy />} />
      </Routes>
    </Router>
  )
}

export default App
