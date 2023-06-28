import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {

  const { name, posterUrl, language, casts , director, _id,description } = movie;
  
  
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const like = () => {
    console.log(count)
 
    if(isLiked)
    {
      setCount(count - 1);
      setIsLiked(false);
    }
    else{
      setCount(count + 1);
      setIsLiked(true);
    }

 
  
  };


  return (
    <>
    <Link key={_id} to ={`/movie/${_id}/details`} style={{ textDecoration: 'none' }}> 
    <Card className='mx-3 my-3 text-white' style={{ width: '20rem' , borderRadius:'30px'  , border:"1px solid black" , backgroundColor:"black"}}>
    <Card.Header></Card.Header> 
         <Card.Img variant="top" src={posterUrl} style={{height:"25rem"}} />
        
            <Card.Body>
           <Card.Title>{name}</Card.Title>
           <Card.Text>
           {description}
           </Card.Text>
         </Card.Body>
   
         <ListGroup className='list-group-flush text-dark' >
         <ListGroup.Item className='d-flex justify-content-between'>
           <span className='text-justify ' style={{fontWeight:"600"}}>Language: </span>
           <span> {language} </span>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between'>
           <span className='text-justify ' style={{fontWeight:"600"}}>Director: </span>
           <span> {director} </span>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between'>
           <span style={{fontWeight:"600"}} className='text-justify '>Cast: </span>
           <span > {casts.join(' , ')} </span>
          </ListGroup.Item>
         
         </ListGroup>
   
         <Card.Body>
   
           <div style={{fontSize:"1.5rem"}} className='d-flex align-items-center justify-content-between'>
           <i className="bi bi-hand-thumbs-up-fill text-success "> 6 k </i> 
           <Card.Link  className='text-info' href="" style={{ textDecoration: 'none' }}>See Trailer <i class="bi bi-arrow-right-circle-fill text-danger"></i></Card.Link>
           </div>
 
         </Card.Body>
       </Card>
       </Link>
          
 
    </>
 
  )
}

export default MovieCard


