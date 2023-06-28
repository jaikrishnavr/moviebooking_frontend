
import './App.css';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Auth from './Pages/Auth/Auth.js';
import LandingPage from './Pages/LandingPage/LandingPage';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import Admin from './Pages/Admin/Admin';

function App() {
  return (
    <div className="">
 <Router>

<Routes>

  <Route exact path="/login" element={<Auth/>}/>
  <Route exact path="/register" />
  <Route exact path ="/movie/:movieId/details" element={<MovieDetails/>}/>
  <Route exact path="/admin" element={<Admin/>}/>
  <Route exact path="/" element={<LandingPage/>}/>

</Routes>

</Router>

    </div>
  );
}

export default App;
