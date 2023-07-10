import React, { useEffect, useState } from 'react'
import ClientMoviesTable from '../../Components/Tables/MoviesTable/ClientMoviesTable';
import ClientTheatresTable from '../../Components/Tables/TheatresTable/ClientTheatresTable';
import { USER_TYPES, keys, userTypes } from '../../Utils/Constants';
import { getAllTheatres } from '../../Api/Theatres.api';
import { getAllMovies } from '../../Api/Movie.api';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import { WidgetContext } from '../Admin/Admin';
import CardList from '../../Components/CardList/CardList';
import ClientCardList from '../../Components/CardList/ClientCardList';

export const Client = () => {
    const [theatresList, setTheatersList] = useState([]);
    const [moviesList, setMoviesList] = useState([]);

  const [counterInfo,setCounterInfo] = useState({
    theatres:0,
    movies:0,
    });

    const [showMoviesTable, setShowMovieTable] = useState(false);
    const [showTheatresTable, setShowTheatresTable] = useState(false);


    const show = {};
  show[keys.THEATRE] = showTheatresTable;
  show[keys.MOVIE] = showMoviesTable;


  
  const fetchTheatres =  async ()=>{
    const theatres= await getAllTheatres();
    setTheatersList(theatres.data);

    counterInfo.theatres = theatres.data.length;
    setCounterInfo({...counterInfo});
}
 const fetchMovies  =  async ()=>{
    const movies= await getAllMovies();
    setMoviesList(movies.data);

    counterInfo.movies = movies.data.length;
    setCounterInfo({...counterInfo});
}



const init = async () => {
    await Promise.all([
      fetchTheatres(),
      fetchMovies(),
    ]);
  };


  useEffect(() => {
    init();
  }, []);


  const onWidgetClick=(id) => {

    console.log(id)
 
    setShowTheatresTable(false);
    setShowMovieTable(false);
    if(id===keys.THEATRE){
        setShowTheatresTable(true);
        
      }
      else if(id===keys.MOVIE){
     
        setShowMovieTable(true)
      }
    }

    const theme =  createTheme({
        direction: 'rtl',
      });


  return (
    <>
      <Navbar />
      <div className="p-3 container">
        <h3 className="text-center">
          Welcome , {localStorage.getItem("name")}
        </h3>

        <p className="text-center text-secondary">
          {" "}
          Take a look at your {localStorage.getItem(USER_TYPES)} status below{" "}
        </p>

<WidgetContext.Provider value={{onWidgetClick, show}}>

        <ClientCardList counterInfo={counterInfo} />
</WidgetContext.Provider>
<ThemeProvider theme={theme} >
        { showTheatresTable &&   <div style={{ maxWidth: "100%" }}> 
        <ClientTheatresTable theatresList={theatresList}/> 
        </div> 
        }
        { showMoviesTable && <div style={{ maxWidth: "100%" }}> 
        <ClientMoviesTable moviesList={moviesList}/> 
        </div>  } 
        </ThemeProvider>
        </div>
        </>
  )
}
