import React from 'react'
import chefLogo from '../assets/chefLogo.avif'

const Header = () => {
  return (
    <>
    <header>
        <img src = {chefLogo} />
        <h1>Chef Claude</h1>
    </header>
    </>
  )
}

export default Header