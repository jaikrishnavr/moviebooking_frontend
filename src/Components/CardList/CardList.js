import { CWidgetStatsC } from '@coreui/react';
import React from 'react'

function CardList(props) {

    const {counterInfo} = props;

  return <div className="row" >
  <div className="col-md-6 col-lg-3 mb-4" >
    <CWidgetStatsC
       progress={{ color: 'warning', value: counterInfo.theatres }}
       color="dark"
       text="Number of theaters"
       title='Theatres' 
       inverse
       value={counterInfo.theatres}
       style={{
         position: "relative",
         backgroundImage: "url('https://media.wbur.org/wp/2020/12/GettyImages-1150049038-1000x630.jpg')",
         backgroundRepeat: "no-repeat",
         backgroundSize: "100% 100%"
      }}/>
  </div>
 
 <div className="col-md-6 col-lg-3 mb-4">
            <CWidgetStatsC
              color="dark"
              progress={{color: 'secondary',value: counterInfo.movies}}
              text="Number of Movies"
              title="Movies"
              inverse
              value={counterInfo.movies}
              style={{
                position: "relative",
                backgroundImage: "url('https://media.istockphoto.com/id/123388042/photo/film-projector-with-blank-frame.jpg?s=612x612&w=0&k=20&c=p3JMv_KLISww2JdXfRpsSAgKtMg1yIRb7W3fQ8PIn0U=')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100% "
             }}
            />
          </div>

          <div className="col-md-6 col-lg-3 mb-4">
            <CWidgetStatsC
              color="dark"
              progress={{ color: 'danger',value: counterInfo.booking}}
              text="Number of bookings"
              title="Booking"
             
              value={counterInfo.booking}
              style={{
                position: "relative",
                backgroundImage: "url('https://inc42.com/wp-content/uploads/2019/03/movie.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100% "
             }}
            />
          </div>


          <div className="col-md-6 col-lg-3 mb-4">
            <CWidgetStatsC
              color="dark"
              progress={{ value: counterInfo.users }}
              text="Number of users"
              title="users"
              value={counterInfo.users}
              inverse
              style={{
                position: "relative",
                backgroundImage: "url('https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/MSNBC/Components/Video/150806/tdy_bush_iphone_150806.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100% "
             }}
            />
          </div>

        </div>
  
}

export default CardList