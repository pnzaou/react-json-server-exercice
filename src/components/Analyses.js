import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Analyses = () => {
    const [orders, setOrder] = useState([])
    const [date] =useState(new Date().getDate())

    useEffect(() => {
        fetch('http://localhost:3001/orders')
        .then(rep => rep.json())
        .then(data => setOrder(data))
    },[])

    const pending = orders.filter(order => order.etat === 'en cours')
    const canceled = orders.filter(order => order.etat === 'annulée')
    const done = orders.filter(order => order.etat === 'terminé')
    let recette = 0
    for (let i = 0; i < done.length; i++) {
        const dateOrder = new Date(done[i].create_at).getDate()
        if(dateOrder === date) {
            recette += parseFloat(done[i].montantTotal)
        }
    }

  return (
    <div>
        <div className="row mt-4">
            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Commandes en cours :</h5>
                        <h5 className="card-text">{pending.length}</h5>
                        <Link href="/admin-dashboard/orders" className="btn btn-primary">Liste des commandes</Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Commandes validées :</h5>
                        <h5 className="card-text">{done.length}</h5>
                        <Link href="/admin-dashboard/orders" className="btn btn-primary">Listes des commandes</Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Commandes annulées :</h5>
                        <h5 className="card-text">{canceled.length}</h5>
                        <Link href="/admin-dashboard/orders" className="btn btn-primary">Listes des commandes</Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Recettes Journalières :</h5>
                        <h5 className="card-text">{recette} $</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Analyses
