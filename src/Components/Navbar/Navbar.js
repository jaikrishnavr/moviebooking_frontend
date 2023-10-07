import { Button, Form, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { isUserLoggedIn } from "../../Utils/Helper";
import { useNavigate } from "react-router-dom";

import '../../Components/Tables/TableCommon.css'


const Navbar = ({filterMovies}) => {



const isLoggedIn = isUserLoggedIn();

const navigate = useNavigate();
const [searchValue, onSearchChange] = useState("");

const onInputChange=(e)=>{
    onSearchChange(e.target.value);

    if(filterMovies){
        filterMovies(e.target.value);
    }
}


const onAuthButtonClick = () => {

    if(isLoggedIn){
        localStorage.clear();
     }
     navigate("/login");

 }

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOffcanvasToggle = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    return (
        <div className=" sticky-top bodybg" style={{backgroundColor:"black"}}>
            <div className="px-2 py-1 d-flex align-items-center justify-content-around">
                <div className="px-1">
                    <div className="display-6 text-light py-1">MBA</div>
                </div>

                <div className="d-none d-md-block">
                <Form.Control size='lg' type="text" placeholder="Search Movie" input={searchValue} onChange={onInputChange} />
                </div>
                <div className="d-none d-md-block">
                    <Button className="btn btn-danger"  style={{backgroundColor:"#ED2B2A"}} onClick={onAuthButtonClick}>{(isLoggedIn)?"Logout": "Login"}</Button>
                </div>

                <div className="d-md-none">
                    <Button
                        className="btn text-dark py-1 px-4"
                        style={{ backgroundColor: "#F1C27B", borderColor: "#FFD89C" }}
                        onClick={handleOffcanvasToggle}
                    >
                        Menu
                    </Button>
                </div>
            </div>

            <Offcanvas show={showOffcanvas}  onHide={handleOffcanvasToggle} className="text-white" style={{backgroundColor:"transparent" , backdropFilter: "blur(15px)"}} >
                <div >
                <Offcanvas.Header closeButton style={{backgroundColor: "rgba(245, 245, 231, 0.4)" }}>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                </div>
                <Offcanvas.Body>
                    <div className="d-flex flex-column">
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Search Movie"
                            className="mb-3"
                        />
                        <div className="text-center">

                        <Button className="btn btn-danger px-5 py-2 mb-3" style={{backgroundColor:"#ED2B2A"}} onClick={onAuthButtonClick}>{(isLoggedIn)?"Logout": "Login"}</Button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Navbar;


/* import { Button, Form } from "react-bootstrap";
const token = localStorage.getItem(TOKEN)

const Navbar = () => {
  return (
    <div className="container-fluid bg-dark sticky-top">
      <div className=" px-5 py-2 d-flex align-items-center justify-content-between">
        <div className="px-1 ">
          <div className="display-6 text-light py-1"> MBA </div>
        </div>

        <div className="">
          <Form.Control size="lg" type="text" placeholder="Search Movie" />
        </div>
        <div className="">
          <Button className="btn btn-danger px-5 py-2">{(token)?"Logout": "Login"}</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar; */