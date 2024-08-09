import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

export default function OrderListAdmin() {
  const [orders, setOrder] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/orders')
    .then(rep => rep.json())
    .then(data => setOrder(data))
  },[])

  const pending = orders.filter(order => order.etat === 'en cours')
  const canceled = orders.filter(order => order.etat === 'annulée')
  const done = orders.filter(order => order.etat === 'terminé')

  return (
    <div>
      <h1 className="text-center">
        Liste des commandes
      </h1>
      <br />
      <br />
      <h4 className="text-center">Commandes en cours</h4>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Etat</th>
            <th>Montant total</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
        {pending.map(order => (
            <tr key={order.id}>
            <td>N° {order.id}</td>
            <td>{order.etat}</td>
            <td>{order.montantTotal}</td>
            <td style={{ 
              display: 'flex'
             }}>
              <Link to={`/admin-dashboard/orders/${order.id}`} className='btn btn-secondary'>Détails</Link>
             </td>
          </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <h4 className="text-center">Commandes Terminées</h4>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Etat</th>
            <th>Montant total</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {done.map(order => (
            <tr key={order.id}>
              <td>N° {order.id}</td>
              <td>{order.etat}</td>
              <td>{order.montantTotal}</td>
              <td style={{ 
                display: 'flex'
              }}>
                <Link to={`/admin-dashboard/orders/${order.id}`} className='btn btn-secondary'>Détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <h4 className="text-center">Commandes Annulées</h4>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Etat</th>
            <th>Montant total</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {canceled.map(order => (
            <tr key={order.id}>
              <td>N° {order.id}</td>
              <td>{order.etat}</td>
              <td>{order.montantTotal}</td>
              <td style={{ 
                display: 'flex'
              }}>
                <Link to={`/admin-dashboard/orders/${order.id}`} className='btn btn-secondary'>Détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
