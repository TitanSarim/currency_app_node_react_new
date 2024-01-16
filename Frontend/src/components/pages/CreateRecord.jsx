import React, { useState } from 'react'
import axios from 'axios'
import './createRecord.css'
import bgImg from '../../assets/4k-space-glowing-ring-es4tss2e6i1dzfj6.png'

const CreateRecord = () => {

  const [name, setName] = useState("")
  const [cnic, setCnic] = useState()
  const [currency, setCurrency] = useState("")
  const [amount, setAmount] = useState()
  const [totalamount, setTotalAmount] = useState()
  const [error, setError] = useState(null)

  const createRecord = async () => {

    if (!name || !cnic || !currency || !amount || !totalamount) {
      setError('All fields are required');
      return
    }

    const data = {
      name: name,
      cnic: cnic,
      currency: currency,
      amount: amount,
      totalamount: totalamount
    }

    try {
      await axios.post(`http://localhost:3800/api/v1/createCurrey`, data);
      window.location.reload()
    } catch (error) {
        setError(error.message || 'An error occured')
    }

  }

  const handleTotalChange = (e) => {
    
    const inputValue = e.target.value;

    setAmount(inputValue)

    if(currency === 'USD'){
      setTotalAmount(inputValue * 281)
    }else if(currency === 'GBP'){
      setTotalAmount(inputValue * 358)
    }else if(currency === 'EUR'){
      setTotalAmount(inputValue * 308)
    }else if(currency === 'AED'){
      setTotalAmount(inputValue * 77)
    }else if(currency === 'SAR'){
      setTotalAmount(inputValue * 75)
    }

  }

  return (
    <div className='create-record'>

      <div className='create-record-bg'>
        <p>Exchange</p>
      </div>

      <div className='create-record-container'>

        <div className='create-record-wrapper'>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'/>
          <input type='number' value={cnic} onChange={(e) => setCnic(e.target.value)} placeholder='CNIC'/>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option>-Select Currency-</option>
              <option>USD</option>
              <option>GBP</option>
              <option>EUR</option>
              <option>AED</option>
              <option>SAR</option>
              
              
          </select>
          {name && cnic && currency && amount && totalamount ? null : <p>{error}</p>}
        </div>

        <div className='create-record-calculationbox'>
          <input type='number' value={amount} onChange={handleTotalChange} placeholder='Amount' />
          <input type='number' value={totalamount} placeholder='Total Amount' disabled />
          <button onClick={createRecord}>
            Create
          </button>
        </div>

      </div>

    </div>
  )
}

export default CreateRecord