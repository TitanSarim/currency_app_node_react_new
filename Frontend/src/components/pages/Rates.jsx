import React from 'react'
import { Link } from 'react-router-dom'

import './Rates.css'

const Rates = () => {
  return (
    <div className='home-container'>

         <div className='rates-container'>

            <table>
                <thead>
                  <tr>
                    <th>Name:</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>USD</td>
                    <td>GBP</td>
                    <td>EUR</td>
                    <td>AED</td>
                    <td>SAR</td>
                  </tr>
                  <tr>
                    <td>1 USD = 278 PKR</td>
                    <td>1 GBP = 278 PKR</td>
                    <td>1 EUR = 278 PKR</td>
                    <td>1 AED = 278 PKR</td>
                    <td>1 SAR = 278 PKR</td>
                  </tr>
                </tbody>
            </table>
            
            <Link to="/addRecord">Sale</Link>

      </div>
      

    </div>
  )
}

export default Rates