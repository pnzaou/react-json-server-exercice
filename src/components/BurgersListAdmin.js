import React from 'react'
import useBurgers from '../hooks/burger.hook'
import Table from 'react-bootstrap/Table'
import { Link, useNavigate } from 'react-router-dom'

export default function BurgersListAdmin() {
  const burgers = useBurgers()
  const naviagte = useNavigate()

  const handleDelete = (id) => {
      fetch(`http://localhost:3001/burgers/${id}`, {
        method: 'DELETE'
      }).then(response => { 
        if(response.ok) {
          naviagte(0)
        }
      }).catch(err => {
        console.log(err);
      })
  }
  return (
    <div>
      <h1 className="text-center">
        Liste des burgers
      </h1>
      <Link to='/admin-dashboard/burgers/ajouter' className='btn btn-primary'>Ajouter</Link>
      <br />
      <br />
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Description</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {burgers.map(burger => (
            <tr key={burger.id} style={ burger.archived? { 
              textDecoration: 'line-through', } : {}}>
            <td>{burger.id}</td>
            <td>{burger.name}</td>
            <td>{burger.price}</td>
            <td>{burger.description}</td>
            <td style={{ 
              display: 'flex'
             }}>
              <Link to={`/admin-dashboard/burgers/modifier/${burger.id}`} className='btn btn-secondary'>&#9998;</Link>
              <Link to={`/admin-dashboard/burgers/${burger.id}`} className="btn btn-info text-white">&#128712;</Link>
              <button className="btn btn-danger text-white" onClick={() => handleDelete(burger.id) }>🗑</button>
             </td>
          </tr>
          ))}
        </tbody>
    </Table>
    </div>
  )
}
