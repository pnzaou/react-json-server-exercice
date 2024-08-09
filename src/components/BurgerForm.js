import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const BurgerForm = ({isEdit}) => {
    const navigate = useNavigate()
    const [champ, setChamp] = useState({name: '', price: '', image: '', description: ''})
    const { id } = useParams()

    useEffect(() => {
        if(id){
            fetch(`http://localhost:3001/burgers/${id}`)
            .then(rep => rep.json())
            .then(data => {
                setChamp(data)
            })
        }
    },[id])

    const handleChange = (e) => {
        setChamp({...champ, [e.target.name]: e.target.value})
    }

    const addPokemon = async () => {

        const rep = await fetch('http://localhost:3001/burgers')
        const data = await rep.json()
        const id = data.length + 1

        fetch('http://localhost:3001/burgers', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...champ, id: id.toString(), price: parseFloat(champ.price), archived: false})
        })
        .then(rep => {
            if(rep.ok) {
                navigate('/admin-dashboard/burgers')
            }
        })
    }

    const updatePokemon = async () => {
        fetch(`http://localhost:3001/burgers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(champ)
        })
        .then(rep => {
            if(rep.ok) {
                navigate('/admin-dashboard/burgers')
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        isEdit? updatePokemon() : addPokemon()
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            name='name'
                            type="text"
                            placeholder="Nom du burger"
                            value={champ.name}
                            onChange={handleChange}
                        />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            name='image'
                            type="text"
                            placeholder="Image du burger"
                            value={champ.image}
                            onChange={handleChange}
                        />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control
                            name='price'
                            type="text"
                            placeholder='Ex: 4.99'
                            value={champ.price}
                            onChange={handleChange}
                            min={0}
                        />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name='description'
                            as="textarea"
                            placeholder="Description du berger"
                            value={champ.description}
                            onChange={handleChange}
                        />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">{isEdit? 'Modifier' : 'Ajouter'}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default BurgerForm
