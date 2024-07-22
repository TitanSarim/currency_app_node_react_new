import React, { useState } from 'react'
import axios from 'axios';
import './Auth.css'
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'

const Auth = () => {

    const naviagte = useNavigate();

    const [activeTab, setIsActiveTab] = useState('login');

    const [lName, setLName] = useState('');
    const [fName, setFName] = useState('');
    const [uName, setUName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [lEmail, setLEmail] = useState('');
    const [lPassword, setLPassword] = useState('');


    const handleChangeTab = (tab) => {
        setIsActiveTab(tab)
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            firstname: lName, 
            lastname: lName, 
            username: uName, 
            email: email, 
            age: age, 
            country: country, 
            phoneno: phone, 
            avatar: null, 
            password: password
        }
        const res = await axios.post('http://localhost:3800/api/v1/userRegister', formData);
        console.log("res", res)
        if(res?.data?.success === true){
            setIsActiveTab("login")
        }
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            email: lEmail, 
            password: lPassword, 
        }
        const res = await axios.post('http://localhost:3800/api/v1/userLogin', formData);
        console.log("res", res)
        if(res?.data?.success === true){
            Cookies.set('token', res?.data?.token, { expires: 7 })
            console.log("token sotred",res?.data?.token);
            naviagte('/');
            window.location.reload();
        }
    }

  return (
    <div className='auth-container'>

        <div className='auth-tabs'>
            <button onClick={() => handleChangeTab('login')} className={activeTab === 'login' ? 'auth-tabs-tab-active' : ''}>Login</button>
            <button onClick={() => handleChangeTab('register')} className={activeTab === 'register' ? 'auth-tabs-tab-active' : ''}>Register</button>
        </div>

        {activeTab === 'register' && (
            <form className='auth-register-form' onSubmit={handleRegisterSubmit}>

                <div>
                    <div>
                        <input type='text' required placeholder='Last Name' onChange={(e) => setLName(e.target.value)}/>
                    </div>
                    <div>
                        <input type='text' required placeholder='First Name' onChange={(e) => setFName(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <div>
                        <input type='text' required placeholder="Username *" onChange={(e) => setUName(e.target.value)}/>
                    </div>
                    <div>
                        <input type='email' required placeholder='Email *' onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <div>
                        <input type='number' required placeholder="Age *" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <div>
                        <input type='text' required placeholder='Country *' onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <div>
                        <input type='number' required placeholder="Phone *" onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div>
                        <input type='password' required placeholder='Password *' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <button type='submit'>SignUp</button>

            </form>
        )}

        {activeTab === 'login' && (
            <form className='auth-login-form' onSubmit={handleLoginSubmit}>
                    
                <div>
                    <input type='email' required placeholder='Email *' onChange={(e) => setLEmail(e.target.value)}/>
                </div>
                <div>
                    <input type='password' required placeholder='Password *' onChange={(e) => setLPassword(e.target.value)}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        )}
    </div>
  )
}

export default Auth