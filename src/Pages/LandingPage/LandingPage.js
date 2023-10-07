import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Carousal from '../../Components/Carousal/Carousal'
import { useState } from 'react'
import { getAllMovies } from '../../Api/Movie.api';
import { CSpinner } from '@coreui/react';
import MovieList from '../../Components/MovieList/MovieList';

let allMovieData=[];

function LandingPage() {

  const [moviesData , setMoviesData] = useState(null);

  const filterMovies = (searchValue)=>{
    console.log(allMovieData);

const filteredMovies = allMovieData.filter((movie)=>{
    const movieName = movie.name.toLowerCase();
    console.log(movieName);
    return movieName.startsWith(searchValue.toLowerCase());
})

setMoviesData(filteredMovies);
}

  const fetchMovies = async () => {
    try {
      const movies = await getAllMovies();
      allMovieData = movies.data;
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
        <Navbar filterMovies={filterMovies}/>
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