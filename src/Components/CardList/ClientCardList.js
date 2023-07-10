import { CWidgetStatsC } from "@coreui/react";
import React, { useContext } from "react";
import { WidgetContext } from "../../Pages/Admin/Admin";
import Cwidget from "../Cwidget/Cwidget";
import { keys } from "../../Utils/Constants";


function ClientCardList(props) {
  const { counterInfo } = props;



  return (
    <div className="row">
      <div className="col-md-6 col-lg-3 mb-4">
      <Cwidget id={keys.THEATRE}  value={counterInfo.theatres} text="Number of Theatres" title="Theatres" bootstrapcolour="warning" inverse={true} backgroundImage={" url('https://media.wbur.org/wp/2020/12/GettyImages-1150049038-1000x630.jpg')"}/>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
      <Cwidget id={keys.MOVIE} value={counterInfo.movies} text="Number of Movie" title="Movie" bootstrapcolour="danger" inverse={true} backgroundImage={" url('https://media.istockphoto.com/id/123388042/photo/film-projector-with-blank-frame.jpg?s=612x612&w=0&k=20&c=p3JMv_KLISww2JdXfRpsSAgKtMg1yIRb7W3fQ8PIn0U=')"}/>
      </div>

      
    </div>
  );
}

export default ClientCardList;
