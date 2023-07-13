import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTheatresById } from '../../Api/Theatres.api';
import { getMovieById } from '../../Api/Movie.api';
import Navbar from '../../Components/Navbar/Navbar';
import { CSpinner } from '@coreui/react';
import './Booking.css'
import Cinema from '../../Components/Cinema/Cinema';





const Booking = () => {

    const {movieId, theatreId} = useParams();

    console.log(movieId)
    
    console.log(theatreId)

    const [movieDetails , setMovieDetails] = useState(null);
    const [TheatersDetails , setTheatersDetails]=useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getTheatresDetails = async () => {
        const theatresData = await getTheatresById(theatreId);
        setTheatersDetails(theatresData.data);
        
      };
    
      const getMovieDetails = async () => {
        const movieDetails = await getMovieById(movieId);
        console.log(movieDetails);
        setMovieDetails(movieDetails.data);
        
    
      };
    
    const init=async ()=> { 
       await Promise.all([getTheatresDetails(), getMovieDetails()]);
       setIsLoading(false);
    }
    
      useEffect(() => {
        init();
      }, []);
    

  return <div>

<Navbar/>

<div className='bg-black text-center fullView'>
    {
        isLoading && <CSpinner color="danger" variant="grow"/>
}

    {
        !isLoading &&  <div className='py-5'> 

            <h2 className='fw-bold text-light'>{movieDetails.name}</h2>

            <ShowCase/>
            <Cinema movieDetails={movieDetails}/>

        </div>


    }
</div>
</div>



  
}




function ShowCase() {
    return (
      <ul className="ShowCase">
        <li>
          <span className="seat" /> <small>Not Occupied</small>
        </li>
        <li>
          <span className="seat selected" /> <small>Selected</small>
        </li>
        <li>
          <span className="seat occupied" /> <small>Occupied</small>
        </li>
      </ul>
    )
  }


export default Booking;