import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { CSpinner } from '@coreui/react';
import { getMovieById } from '../../Api/Movie.api';
import ReactPlayer from 'react-player';
import { Button } from 'react-bootstrap';

function MovieDetails() {

    const [movieDetails , setMovieDetails] = useState();

    const {movieId}  = useParams();

    const fetchMovieDetails = async () => {
        const movieDetails = await getMovieById(movieId);

        setMovieDetails(movieDetails.data);
    }

    useEffect(()=>{

        fetchMovieDetails();
    },[])

    console.log(movieId)

  return <>
    
    <Navbar/>
  

    <div>
        {(!movieDetails) ?   <div className="d-flex justify-content-center"><CSpinner color="success" /></div> : <>
        
        <div style={{border: '3px solid black' , backgroundColor:"black"}} >
            <ReactPlayer url={movieDetails.trailerUrl} controls={true} width="100%" height="45vh" muted={false} />
        </div>

<div className='row my-4' style={{padding:'40px'}}> 

        <div className='col-lg-5 col-md-6 col-xl-5  ' >
            <img src={movieDetails.posterUrl} width={300} height={500}/>
        </div>
       
        <div className='col-lg-6 col-md-5 col-xl-6  '>
    <h2 className='bolder'>About the movie</h2>
    <div>
       
        <span>{movieDetails.description}</span>
    </div>
    <div>
    <span className='badge bg-info  rounded-pill m-1'>{movieDetails.language}</span>
    <span className='badge bg-success rounded-pill m-1'>{movieDetails.releaseStatus}</span>
    <span className='badge bg-danger rounded-pill m-1'>Directed by:  {movieDetails.director}</span>
    </div>
    <hr/>
  
        <h3> {movieDetails.name}</h3>
        <h6> Directed by: {movieDetails.director}</h6>
        <h6> Released on: {movieDetails.releaseDate}</h6>

<br/>
        <h5 > Cast</h5>

        {
            movieDetails.casts.map((name) => {
                return <li>{name}</li>
            })
        }

        <div className='my-4'>
            <Button variant='warning'>Book Ticket</Button>
        </div>
    
</div>
</div>




        </>}
    </div>

    <div>

    </div>
  
    
    </>
}

export default MovieDetails