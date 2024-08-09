import React from 'react'
import styles from './dashboard.module.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Dashbord = () => {
  const navigate = useNavigate()

  const deconnexion = () => {
    localStorage.clear()
    navigate('/admin-login')
  }
  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.sidebar}>
        <div className={styles.dashbordTitle}>Tableau de bord</div>
        <div className={styles.dashbordOption}>
          <Link className={styles.lienOption} to='/admin-dashboard/burgers'>Listes des burgers</Link>
        </div>
        <div className={styles.dashbordOption}>
          <Link className={styles.lienOption} to='/admin-dashboard/orders'>Listes des commandes</Link>
        </div>
        <div className={styles.dashbordOption}>
        <button className={styles.lienOption} onClick={() => deconnexion()}>Déconnexion</button>
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashbord
