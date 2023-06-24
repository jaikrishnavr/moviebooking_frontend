import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Carousal from '../../Components/Carousal/Carousal'
import { useState } from 'react'
import { getAllMovies } from '../../Api/Movie.api';
import { CSpinner } from '@coreui/react';
import MovieList from '../../Components/MovieList/MovieList';


function LandingPage() {

  const [moviesData , setMoviesData] = useState(null);

  const fetchMovies = async () => {
    try {
      const movies = await getAllMovies();
      setMoviesData(movies.data)
    }
    catch(e){
      console.log(e);
    }

  }


  useEffect(()=> {
    fetchMovies();

  },[])




  return (
    <div>
        <Navbar/>
        <Carousal/>

        <div className='text-center'>
          {
            (moviesData===null ?   <CSpinner color="danger" variant="grow"/> : <MovieList moviesData={moviesData}/> )
          }

        </div>
           
    </div>
  )
}

export default LandingPage