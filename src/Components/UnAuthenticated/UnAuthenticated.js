import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Lineblock from '../../assets/403error message.gif';


function UnAuthenticated() {

    const location =  useLocation();
    const currentPath = location.pathname;


    console.log(currentPath);


    return <div className=" vh-100 text-dark d-flex flex-column align-items-center justify-content-center" style={{backgroundColor:"#E9E1D7"}}>
<img src={Lineblock} style={{width:"50vh"}}/>
        <h3 className="fw-bolder"> You need to be logged in to access this page  </h3>
        <Link to={`/login?redirectKey=${currentPath}`}>
            <Button variant="primary"  > Login  </Button>
        </Link>
    </div>
}

export default UnAuthenticated