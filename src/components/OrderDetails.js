import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

const OrderDetails = () => {
    const [order, setOrder] = useState({})
    const [client, setClient] = useState({})
    const [burger, SetBurger] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()


    useEffect(() => {

        fetch(`http://localhost:3001/orders/${id}`)
        .then(rep => rep.json())
        .then(data => {
            setOrder(data)
            if(data) {
                fetch(`http://localhost:3001/clients/${data.userId}`)
                .then(rep => rep.json())
                .then(data => {
                    setClient(data)
                })

                fetch(`http://localhost:3001/burgers/${data.burgerId}`)
                .then(rep => rep.json())
                .then(data => {
                    SetBurger(data)
                })
            }
        }).catch(err => console.log(err))

    }, [id])

    const setDone = () => {
        fetch(`http://localhost:3001/orders/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...order, etat: 'terminé'})
        }).then(rep => {
            if(rep.ok) {
                toast.success('Commande prête.', {
                    position: 'bottom-right',
                    duration: 3000
                })
                navigate('/admin-dashboard/orders')
            }
        })
    } 

    const cancel = () => {
        fetch(`http://localhost:3001/orders/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...order, etat: 'annulée'})
        }).then(rep => {
            if(rep.ok) {
                toast.error('Commande annulée.', {
                    position: 'bottom-right',
                    duration: 3000
                })
                navigate('/admin-dashboard/orders')
            }
        })
    }
    
    return (
        <div>
            <h1 className="text-center mt-4">
                Détails de la commande
            </h1>
            <br />
            <Link to='/admin-dashboard/orders'>Retour</Link>
            <br />
            <br />
            <div className=' col-5 card'>
                <div className="content text-center">
                    <h5>Nom du client : {client.lastname}</h5>
                    <h5>Prénom du client : {client.firstname}</h5>
                    <h5>Téléphone du client : {client.tel}</h5>
                    <h5>Burger commandé : {burger.name}</h5>
                    <h5>Quantité : {order.quantite}</h5>
                    <h5>Montont total : {order.montantTotal} $</h5>
                </div>
                <br />
                {order.etat === 'en cours' ? (
                    <div className="action row" style={{ paddingLeft: 100, paddingBottom: 20 }}>
                    <button className='col-4 btn btn-primary' style={{ border: 'none' }} onClick={() => setDone()}>Terminée</button>
                    <div className="col-2"></div>
                    <button className='col-3 btn btn-danger' style={{ border: 'none' }} onClick={() => cancel()}>Annuler</button>
                </div>
                ): ''}
            </div>
        </div>
    )
}

export default OrderDetails
