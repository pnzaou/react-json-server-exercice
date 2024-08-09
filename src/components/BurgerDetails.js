import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function BurgerDetails() {
    const {id} = useParams()
    const [burger, setBurger] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/burgers/${id}`)
        .then(rep => rep.json())
        .then(data => setBurger(data))
    }, [id])

    const toggleArchived = () => {
        fetch(`http://localhost:3001/burgers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...burger, archived: !burger.archived})
        }).then(rep => {
            if(rep.ok) {
                setBurger(prevBurger => ({ ...prevBurger, archived: !prevBurger.archived }))
            }
        })
    }

  return (
    <div>
        <h1 className="text-center">
            Détails du Burger
        </h1>
        <Link to='/admin-dashboard/burgers'>Retour</Link>
      <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={burger.image} />
                <Card.Body>
                    <Card.Title>{burger.name}</Card.Title>
                    <Card.Text>
                        {burger.description}
                    </Card.Text>
                    <p className='text-end'>{burger.price}</p>
                    <Button variant="secondary" onClick={() => toggleArchived()}>{burger.archived ? 'Désarchiver' : 'Archiver'}</Button>
                </Card.Body>
            </Card>
        </div>
    </div>
  )
}
