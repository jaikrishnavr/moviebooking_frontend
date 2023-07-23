import React from 'react';


function UnAuthorised() {

    const Logout = () => {
        localStorage.clear();
        window.location.href = "/login";
      };

      


  return (
    <div className='text-center text-white vh-100 d-flex align-items-center flex-column justify-content-center'>
        
        <img src="" style={{width:"50vh"}}/> 
        
        <h2> OOPS! doesn't have sufficent permission to access  this page</h2>

        <button className='btn btn-success' onClick={Logout}> here to go to Login</button>

    </div>
  )
}

export default UnAuthorised