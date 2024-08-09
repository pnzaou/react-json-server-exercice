import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const BugerItem = ({ burger }) => {
  return (
    <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src={burger.image} />
      <Card.Body>
        <Card.Title>{burger.name}</Card.Title>
        <Card.Text>
          {burger.description}
          <div className="text-end">{burger.price} $</div>
        </Card.Text>
        <Link to={`/commander/${burger.id}`} className='btn btn-primary'>Commander</Link>
      </Card.Body>
    </Card>
  )
}

export default BugerItem