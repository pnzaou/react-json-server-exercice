import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OrderForm from '../components/OrderForm'

const OrderPage = () => {
    const {id}  = useParams()
    const [burger, setBurger] = useState({})

    useEffect(()=> {
        fetch(`http://localhost:3001/burgers/${id}`)
        .then(rep => rep.json())
        .then(data => setBurger(data))
    }, [id])

  return (
    <div className='pt-4 mb-4' style={{ 
        background: '#f5f5f5',
        height: '100vh' 
    }}>
        <h1 className="text-center">Veuillez remplier le formulaire</h1>
        <p className='text-center'>Vous allez commander : {burger.name}</p>
        <div className='mt-4'>
            <OrderForm burger={burger}/>
        </div>
    </div>
  )
}

export default OrderPage
