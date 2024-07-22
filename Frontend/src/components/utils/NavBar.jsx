import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

import './NavBar.css'
import axios from 'axios';

const NavBar = () => {

    const navigate = useNavigate() 
    const [isAuth, setIsAuth] = useState(false)

    const handleLoutOut = async () => {
        await axios.get('http://localhost:3800/api/v1/userLogout')
        Cookies.remove('token')
        navigate('/')
        window.location.reload()
    }

    useEffect(() => {
        const token = Cookies.get('token');
        if(token) {
            setIsAuth(true)
        }else{
            setIsAuth(false)
        }
    }, [])

  return (
    <div className='navbar'>

            <h1 className='navbar-heading'>CH Exchange</h1>
            
                <ul className='navbar-container'>

                    <li>
                        <Link to='/'>
                            Home
                        </Link> 
                    </li>

                    {isAuth === true && (
                        <>
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
                        </>
                    )}

                </ul>
            
            {isAuth === true ? (
                <Link className='nav-login' to='/auth' onClick={handleLoutOut}>logout</Link>
            ) : (
                <Link className='nav-login' to='/auth'>Login</Link>
            )}

    </div>
  )
}

export default NavBar