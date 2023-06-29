import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { getAllBookings } from "../../Api/Booking.api";
import { getAllTheatres } from "../../Api/Theatres.api";
import { getAllMovies } from "../../Api/Movie.api";
import { getAllUsers } from "../../Api/Users.api";
import CardList from "../../Components/CardList/CardList";
import { keys } from "../../Utils/Constants";


export const WidgetContext = React.createContext();

function Admin() {
  const [theatresList, setTheatersList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [counterInfo,setCounterInfo] = useState({
      theatres:0,
      movies:0,
      bookings:0,
      users:0});
      
  const [showMoviesTable, setShowMovieTable] = useState(false);
  const [showTheatresTable, setShowTheatresTable] = useState(false);
  const [showBookingsTable, setShowBookingsTable] = useState(false);
  const [showUsersTable, setShowUsersTable] = useState(false);

  const show = {};
  show[keys.THEATRE] = showTheatresTable;
  show[keys.MOVIE] = showMoviesTable;
  show[keys.BOOKING] = showBookingsTable;
  show[keys.USER] = showUsersTable;



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
 const fetchBookings =  async ()=>{
    const bookings= await getAllBookings();
    setBookingsList(bookings.data);

    counterInfo.bookings = bookings.data.length;
    setCounterInfo({...counterInfo});
}
 const fetchUsers =  async ()=>{
    const users= await getAllUsers();
    setUsersList(users.data);

      counterInfo.users = users.data.length;
    setCounterInfo({...counterInfo});
}


  const init = async () => {
    await Promise.all([
      fetchTheatres(),
      fetchMovies(),
      fetchBookings(),
      fetchUsers(),
    ]);
  };

  useEffect(() => {
    init();
    // fetchTheatres();
    // fetchMovies();
    // fetchBooking();
    // fetchUsers();
  }, []);


  const onWidgetClick=(id) => {

    console.log(id)
 
    setShowTheatresTable(false);
    setShowMovieTable(false);
      setShowBookingsTable(false);
      setShowUsersTable(false)


    if(id===keys.THEATRE){
      setShowTheatresTable(true);
      
    }
    else if(id===keys.MOVIE){
   
      setShowMovieTable(true)
    }
    else if(id===keys.BOOKING){
    
      setShowBookingsTable(true)
    }
    else if(id===keys.USER){
  
      setShowUsersTable(true)
    }

  }


  return (
    <>
      <Navbar />
      <div className="p-3 container">
        <h3 className="text-center">
          Welcome , {localStorage.getItem("name")}
        </h3>

        <p className="text-center text-secondary">
          {" "}
          Take a look at your admin status below{" "}
        </p>

<WidgetContext.Provider value={{onWidgetClick, show}}>

        <CardList counterInfo={counterInfo} />
</WidgetContext.Provider>

        { showTheatresTable && <div>table1</div>}
        { showMoviesTable && <div>table2</div>} 
        { showBookingsTable && <div>table3</div>}
        { showUsersTable && <div>table4</div>}
      </div>
    </>
  );
}

export default Admin;
