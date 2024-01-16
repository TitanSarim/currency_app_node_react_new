import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import dollar from '../../assets/dollar.gif'

import bin from '../../assets/bin.gif'
import './Record.css'
import { Link } from 'react-router-dom'

const Record = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState([])

    console.log("data", data)

    useEffect(() => {

        const fetchData = async() => {
            try {
                const response = await axios.get('http://localhost:3800/api/v1/getAllCurrencies')
                setData(response.data.data)
            } catch (error) {
                setError(error.message || 'An error occured')
            }
        }
        fetchData()
    }, [])


    const handleSingleClick =  async (id) => {
        
        try {
            await axios.delete(`http://localhost:3800/api/v1/deleteCurrencies/${id}`)
            window.location.reload()
        } catch (error) {
            setError(error.message || 'An error occured')
        }

    }

    const handleMultipleClick = async () => {


        try {
            for (const item of data) {
            const response = await axios.delete(`http://localhost:3800/api/v1/deleteCurrencies/${item._id}`);
            console.log(`Deleted item with userid ${item._id}:`, response.data);
        }
            window.location.reload()
        } catch (error) {
            setError(error.message || 'An error occured')
        }
    }

  return (
    <div className=''>

       

        {data.length === 0 ? 
            <div className='record-btn'>
                <Link to='/addRecord'>
                    <img src={dollar} alt='img' width={35}/>
                    Add Record
                </Link>
            </div> 
        :
        <>
            <div className='record-btn'>
                <Link to='/addRecord'>
                    <img src={dollar} alt='img' width={30}/>
                    Add Record
                </Link>
            </div> 
            <div className='table-container'>
                <table>
                
                <thead>
                        <tr>
                            {/* <th className='user-id'>Id</th> */}
                            <th>Name</th>
                            <th>CNIC</th>
                            <th>Currency</th>
                            <th>Amount</th>
                            <th className='total-amount'>TOTAL Amount</th>
                            <th>Created At</th>
                            <th className='delete-btn'>
                                <button onClick={handleMultipleClick}>
                                <img src={bin} width={20} alt='bin'/>
                                </button>
                            </th>
                        </tr>
                </thead>

                <tbody>
                        {data?.map((item) => (
                            <tr  key={item.userid}>
                                {/* <td className='user-id'>{item._id}</td>  */}
                                <td>{item.name}</td>
                                <td>{item.cnic}</td>
                                <td>{item.currency}</td> 
                                <td>{item.amount}</td>
                                <td className='total-amount'>{item.totalamount}</td>
                                <td>{moment(item.updatedAt).format("MMM Do YY")}</td>
                                <td className='delete-btn'>
                                <button onClick={() => handleSingleClick(item?._id)}>
                                    <img src={bin} width={20} alt='bin'/>
                                </button>
                                </td>
                            </tr>
                        ))}
                </tbody>

                </table>
            </div>
        </>
        }
    </div>
  )
}

export default Record