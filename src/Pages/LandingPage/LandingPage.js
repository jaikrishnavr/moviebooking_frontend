import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Carousal from '../../Components/Carousal/Carousal'
import { useState } from 'react'
import { getAllMovies } from '../../Api/Movie.api';
import { CSpinner } from '@coreui/react';
import MovieCard from '../../Components/MovieCard/MovieCard';


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


  const getMoviesData =() => {
    return moviesData.map((movie) => <MovieCard MovieDetail={movie}/>)
  } 
  


  return (
    <div>
        <Navbar/>
        <Carousal/>

        <div className='text-center'>

          <h2> Recomended Movies</h2>
          {
            (moviesData===null ?   <CSpinner color="danger" variant="grow"/> : getMoviesData() )
          }

        </div>
           
    </div>
  )
}

export default LandingPage