import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>

            <h1 className='navbar-heading'>CH Exchange</h1>
            
            <ul className='navbar-container'>

                <li>
                    <Link to='/'>
                        Home
                    </Link> 
                </li>

                <li>
                    <Link to='/records'>
                        Records
                    </Link> 
                </li>

                <li>
                    <Link to='/addRecord'>
                        New Records
                    </Link> 
                </li>


            </ul>

    </div>
  )
}

export default NavBar