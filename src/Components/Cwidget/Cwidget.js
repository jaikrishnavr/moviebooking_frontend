import { CWidgetStatsC } from "@coreui/react";
import React, { useContext } from "react";
import { WidgetContext } from "../../Pages/Admin/Admin";

const Cwidget = ({value,title,text,inverse,bootstrapcolour,backgroundImage,id, clicked }) => {
  const { onWidgetClick , show } = useContext(WidgetContext);

  return (
    <CWidgetStatsC
      onClick={() => onWidgetClick(id)}
      progress={{ color: bootstrapcolour, value: value }}
      color="dark"
      text={text}
      title={title}
      inverse={inverse}
      value={value}
      style={{
        cursor: "pointer",
        position: "relative",
        backgroundImage :show[id] ? "linear-gradient(to left, #716F81, #2C3333 )"  : backgroundImage,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    />
  );
};

export default Cwidget;
