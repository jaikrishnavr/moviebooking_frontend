import React from 'react'
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function MovieCard({ movie }) {

  const { name, description, posterUrl, language, casts, director, _id } = movie;
  return (
   
 <Card className='mx-3 my-3 text-white' style={{ width: '20rem' , borderRadius:'30px'  , border:"1px solid black" , backgroundColor:"black"}}>
     
      <Card.Img variant="top" src={posterUrl} style={{height:"25rem"}} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
        Adipurush (Hindi: Ādipuruṣa transl.  First man)[a] is a 2023 Indian epic mythological action film based on the epic Ramayana.[7] The film is written and directed by Om Raut and produced by T-Series and Retrophiles. Shot simultaneously in Hindi and Telugu, the film stars Prabhas, Saif Ali Khan, Kriti Sanon, Sunny Singh and Devdatta Nage.
        </Card.Text>
      </Card.Body>

      <ListGroup className='text-dark' >
        <ListGroup.Item>language</ListGroup.Item>
        <ListGroup.Item>Description</ListGroup.Item>
        <ListGroup.Item>Cast</ListGroup.Item>
      </ListGroup>
     
     
      <Card.Body>
      <Card.Link className='text-danger' href="#">Likes 500k</Card.Link>
        <Card.Link  className='text-white' href="#">Another Link</Card.Link>

      </Card.Body>

    </Card>
       

  )
}

export default MovieCard