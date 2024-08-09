import React from 'react'
import BurgerForm from '../components/BurgerForm'
import { Link } from 'react-router-dom'

const AddBurger = () => {
  return (
    <div>
        <h1 className='text-center'>Ajouter un burger</h1>
        <Link to='/admin-dashboard/burgers'>Retour</Link>
        <BurgerForm isEdit={false}/>
    </div>
  )
}

export default AddBurger
