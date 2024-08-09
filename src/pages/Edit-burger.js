import React from 'react'
import BurgerForm from '../components/BurgerForm'
import { Link } from 'react-router-dom'

export default function EdiBurger() {
  return (
    <div>
        <h1 className='text-center'>Modifier un burger</h1>
        <Link to='/admin-dashboard/burgers'>Retour</Link>
        <BurgerForm isEdit={true}/>
    </div>
  )
}
