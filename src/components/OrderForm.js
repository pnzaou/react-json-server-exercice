import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderForm = ({burger}) => {
    const [champ, setChamp] = useState({firstname: '', lastname: '', tel: '', Qte: 0})
    const [prix, setPrix] = useState(0)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setChamp({...champ, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        setPrix(champ.Qte * burger.price)
    }, [champ.Qte, burger.price])

    const handleSubmit = async (e) => {

        e.preventDefault()

        const user = {
            firstname: champ.firstname,
            lastname: champ.lastname,
            tel: champ.tel
        }

        try {
            const rep = await fetch('http://localhost:3001/clients', {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
            const data = await rep.json()
            console.log(data)  
            
            const rep1 = await fetch('http://localhost:3001/orders', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: data.id,
                    burgerId: burger.id,
                    quantite: parseInt(champ.Qte),
                    montantTotal: prix.toFixed(2),
                    create_at: new Date(),
                    etat: 'en cours'
                })
            })
            const data1 = await rep1.json()
            console.log(data1)
            setChamp({...champ, firstname: 'Votre prénom...', lastname: 'Votre nom...', tel: 'Tel...', Qte: 0})
            navigate('/')

        } catch (error) {
            console.log(error);
        }

    }

  return (
    <div className='container col-md-6 bg-white'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor='lastname' className="form-label">Votre Nom</label>
                <input type="text" name='lastname' className="form-control" id="lastname" value={champ.lastname} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor='firstname' className="form-label">Votre prénom</label>
                <input type="text" name='firstname' className="form-control" id="firstname" value={champ.firstname} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor='tel' className="form-label">Votre numéro</label>
                <input type="tel" name='tel' className="form-control" id="tel" value={champ.tel} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor='Qte' className="form-label">Quantité</label>
                <input type="number" name='Qte' className="form-control" id="Qte" value={champ.Qte} onChange={handleChange} min={0}/>
            </div>
            <div className="mb-3">
                Montant Total : {prix.toFixed(2)} $
            </div>
            {(champ.firstname === '' || champ.lastname === '' || champ.tel === '' || isNaN(parseInt(champ.tel)) || champ.Qte < 1)? '' : <button type="submit" className="btn btn-primary">Confirmer</button>}
        </form>
    </div>
  )
}

export default OrderForm
