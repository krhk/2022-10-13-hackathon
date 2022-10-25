import React from 'react'
import './styles/input.css'
import search from '../assets/search.png';

const Input = () => {
  return (
    <div className='input-div'>
        <input className='input-text' type='text' placeholder='Vyhledejte spoje..' />
        <button className='input-button'>
            <img src={search} alt='search' />
        </button>
    </div>
  )
}

export default Input