import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { CWidgetStatsC } from "@coreui/react";
import { getAllBookings } from "../../Api/Booking.api";
import { getAllTheatres } from "../../Api/Theatres.api";
import { getAllMovies } from "../../Api/Movie.api";
import { getAllUsers } from "../../Api/Users.api";
import CardList from "../../Components/CardList/CardList";


function Admin() {

  const [theatersList, setTheatersList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [counterInfo, setCounterInfo] =useState({
    theatres:0,
    movies:0,
    booking:0,
    users:0,
  });

const fetchTheatres = async () => {
  const theatres =  await getAllTheatres();
  setTheatersList(theatres.data);

  counterInfo.theatres = theatres.data.length;
  console.log(counterInfo);
  setCounterInfo({...counterInfo});
}

const fetchMovies = async () => {
  const movies =  await getAllMovies();
  setMovieList(movies.data);

  counterInfo.movies = movies.data.length;
  setCounterInfo({...counterInfo});
}

const fetchBooking = async () => {
  const booking =  await getAllBookings();
  setBookingList(booking.data);

  counterInfo.booking = booking.data.length;
  setCounterInfo({...counterInfo});
}

const fetchUsers = async () => {
  const users =  await getAllUsers();
  setUserList(users.data);

  counterInfo.users = users.data.length;
  setCounterInfo({...counterInfo});
}

const init = async ()=>{
  await Promise.all([fetchTheatres(), fetchMovies(), fetchBooking(), fetchUsers()]);
}

 

useEffect(() => {
  init();
 // fetchTheatres();
 // fetchMovies();
  // fetchBooking();
  // fetchUsers();
 
},[])

  return <>

 
    
      <Navbar />

      <div className="mt-2 container">
        <h3 className="text-center">Welcome , {localStorage.getItem("name")}</h3>

        <p className="text-center text-secondary"> Take a look at your admin status below </p>

     <CardList counterInfo={counterInfo}/>
      </div>
                       
    </>
  
}

export default Admin;
