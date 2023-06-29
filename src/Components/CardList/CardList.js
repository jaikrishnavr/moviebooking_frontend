import { CWidgetStatsC } from "@coreui/react";
import React, { useContext } from "react";
import { WidgetContext } from "../../Pages/Admin/Admin";
import Cwidget from "../Cwidget/Cwidget";
import { keys } from "../../Utils/Constants";


function CardList(props) {
  const { counterInfo } = props;



  return (
    <div className="row">
      <div className="col-md-6 col-lg-3 mb-4">
      <Cwidget id={keys.THEATRE}  value={counterInfo.theatres} text="Number of Theatres" title="Theatres" bootstrapcolour="warning" inverse={true} backgroundImage={" url('https://media.wbur.org/wp/2020/12/GettyImages-1150049038-1000x630.jpg')"}/>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
      <Cwidget id={keys.MOVIE} value={counterInfo.movies} text="Number of Movie" title="Movie" bootstrapcolour="danger" inverse={true} backgroundImage={" url('https://media.istockphoto.com/id/123388042/photo/film-projector-with-blank-frame.jpg?s=612x612&w=0&k=20&c=p3JMv_KLISww2JdXfRpsSAgKtMg1yIRb7W3fQ8PIn0U=')"}/>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
      <Cwidget id={keys.BOOKING} value={counterInfo.bookings} text="Number of Booking" title="Booking" bootstrapcolour="primary" inverse={true} backgroundImage={" url('https://img.freepik.com/premium-psd/3d-interface-mockup-with-frosted-glass-morphism-effects_311128-347.jpg')"}/>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
      <Cwidget id={keys.USER} value={counterInfo.users} text="Number of User" title="User" bootstrapcolour="info" inverse={true} backgroundImage={" url('https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/MSNBC/Components/Video/150806/tdy_bush_iphone_150806.jpg')"}/>
       
      </div>
    </div>
  );
}

export default CardList;
