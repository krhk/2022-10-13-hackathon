import React, { useState, useEffect } from 'react'
import '../components/styles/filter.css'
import Logo from '../assets/logo.png'

const Filter = ({ test, setTest, setData }) => {
    return (
    <nav>
        <ul>
            <div className='logo-container'>
              <img className='logo' src={Logo} alt='logo' />
              <p className='logo-text'>
                  ŠKOLY
                  <br />
                  KHK
              </p>
            </div>
            <div className='li-container'>
            <li
              onClick={ () => {
                setTest(1)
                  const requestOptions = {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title: 'Zakladka' })
                  };
                  fetch('http://localhost:3001/update?title=zakladni', requestOptions)
                      .then(response => response.json())
                      .then((data) => {
                        setData(data.points)
                      })
                  }
              }
            >ZÁKLADNÍ ŠKOLY</li>
            <li
            onClick={ () => {
             
              setTest(2) // Simple POST request with a JSON body using fetch
              const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ title: 'Stredni' })
              };
              fetch('http://localhost:3001/update?title=stredni', requestOptions)
                  .then(response => response.json())
                  .then((data) => {
                    setData(data.points)
                  })
                }
              }
            
            >STŘEDNÍ ŠKOLY</li>
            <li
            onClick={ () => {
             setTest(3) // Simple POST request with a JSON body using fetch
              const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ title: 'Vysoka' })
              };
              fetch('http://localhost:3001/update?title=vysoke', requestOptions)
                  .then(response => response.json())
                  .then((data) => {
                    setData(data.points)
                  })
              }
             }
            
            >VYSOKÉ ŠKOLY</li>
            </div>
        </ul>
        
    </nav>
  )
}

export default Filter