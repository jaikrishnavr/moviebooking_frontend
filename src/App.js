
import './App.css';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Auth from './Pages/Auth/Auth.js';
import LandingPage from './Pages/LandingPage/LandingPage';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import Admin from './Pages/Admin/Admin';
import AuthHoc from './Hoc/AuthHoc';
import { Client } from './Pages/Client/Client';
import MovieTheatres from './Pages/MovieTheatres/MovieTheatres';
import Booking from './Pages/Bookings/Booking';

function App() {
  return (
    <div className="">
 <Router>

<Routes>

  <Route exact path="/login" element={<Auth/>}/>
  <Route exact path="/signup" element={<Auth/>}/>
  <Route exact path="/client" element={<AuthHoc><Client/></AuthHoc>}/>
  <Route exact path ="/movie/:movieId/details" element={ <MovieDetails/>}/>
  <Route exact path ="/buyTickets/:movieId" element={<AuthHoc> <MovieTheatres/> </AuthHoc>}/>
  <Route exact path ="/buyTickets/:movieId/:theatreId" element={<Booking/>}/>
  <Route exact path="/admin" element={<AuthHoc><Admin/></AuthHoc>}/>
  <Route exact path="/" element={<LandingPage/>}/>

</Routes>

</Router>

    </div>
  );
}

export default App;
