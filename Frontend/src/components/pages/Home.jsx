import React, { useRef, useState } from 'react';

import hero from '../../assets/hero-img-1.png'
import './Home.css'
import aboutImg from '../../assets/undraw_team_up_re_84ok.svg'
import { Link } from 'react-router-dom'
import { CiLocationArrow1 } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";


const Home = () => {

  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);
  const toTop = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [amount, setAmount] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('PKR');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyFromChange = (event) => {
    setCurrencyFrom(event.target.value);
  };


  const handleCalculate = () => {
    if(currencyFrom === 'USD'){
      setCurrencyTo(278*amount)
    }
    if(currencyFrom === 'EUR'){
      setCurrencyTo(321*amount)
    }
    if(currencyFrom === 'GBP'){
      setCurrencyTo(340*amount)
    }
  }

  return (
    <>
    <div className='home-container' ref={toTop}>

        <div className='wrapper'>
           <p>FAST & HASTLE FREE</p>
           <span>The Most Powerful <br/>Money Exchange Service <br/>In The World</span>
           <button onClick={() => scrollToSection(aboutUsRef)}>About Us</button>
        </div>

        <div className='home-convertor-form'>
          <p>Currency Converter</p>
            <div>
              <p>I did like to exchange</p>
              <input 
                type='number'
                placeholder='$'
                value={amount}
                onChange={handleAmountChange}      
              />
            </div>
          <div>
            <p>Currency From</p>
            <select value={currencyFrom} onChange={handleCurrencyFromChange}>
              <option disabled>Select</option>
              <option selected>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div>
            <p>Currency To PKR</p>
            <input placeholder='PKR' disabled="" value={currencyTo}/>
          </div>
          <button onClick={handleCalculate}>Convert Now</button>
        </div>

        <img src={hero} alt='abc'/>

    </div>

    <div className='about-us ' ref={aboutUsRef}>
      <div className='about-us-container'>
        <div>
          <p>About Us</p>
          <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </span>
        </div>
        <div>
          <p>Our Goal</p>
          <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          <br/>
          <br/>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </span>
        </div>
        <button onClick={() => scrollToSection(contactUsRef)}>Contact Us</button>
      </div>
      <img src={aboutImg} alt='abc'/>

      <button className='toTop' onClick={() => scrollToSection(toTop)}>
        <IoIosArrowRoundUp size={30}/> 
      </button>

    </div>

    <div className='contact-us'  ref={contactUsRef} >
        <div className='contact-us-address'>
          <p>Location</p>

          <div>
            <CiLocationArrow1 size={30}/>
            <p>Businessman colony ryk</p>
          </div>

          <div>
            <CiPhone size={30}/>
            <p>+92 349 92929</p>
          </div>

          <div>
            <CiMail size={30}/>
            <p>abc@gmail.com</p>
          </div>

          <div>
            <CiTimer size={30}/>
            <p>9am-5pm</p>
          </div>
        </div>

        <div className='contact-us-form'>
          <p>Send Us a Message</p>
            <div>
              <p>Name</p>
              <input type='text'/>
            </div>
            <div>
              <p>Phone No</p>
              <input type='number'/>
            </div>
            <div>
              <p>Email</p>
              <input type='email'/>
            </div>
            <div>
              <p>Message</p>
              <input type="text"/>
            </div>
            <button>Submit</button>
        </div>

        <button className='toTop' onClick={() => scrollToSection(toTop)}>
          <IoIosArrowRoundUp size={30}/> 
        </button>
    </div>

    </>
  )
}

export default Home