import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [champ, setChamp] = useState({email: '', password: ''})

    const handleChange = (e) => {
        setChamp({...champ, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/admin')
        .then(rep => rep.json())
        .then(admins => {
            const admin = admins.find((admin) => 
                admin.email === champ.email && admin.password === champ.password)

            if(admin) {
                localStorage.setItem('isAuth', true)
                navigate('/admin-dashboard', { replace: true })
            } else {
                toast.error("Email ou Mot de Passe Incorrect !")
                setChamp({...champ, email: '', password:''})
            }
        })
    }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">S'authentifier</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                type="email"
                placeholder="Enter email"
                value={champ.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                name='password'
                type="password"
                placeholder="Votre Mot de passe..."
                value={champ.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Se connecter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
