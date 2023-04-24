import React, { useEffect, useState } from "react";
import "./Alertaz.scss";
const Alertaz = ({ messageGroup }) => {
  const [alerts, setAlerts] = useState(messageGroup ? messageGroup : []);

  // [
  //   { type: "success", message: "Addded to Cart" },
  //   { type: "err", message: "Action Failed, Value is required!" },
  //   { type: "warn", message: "Might be some warning!" },
  // ]

  useEffect(() => {
    // console.log("alerts in alertaz", alerts, "messageGroup", messageGroup);
    if (messageGroup) {
      setAlerts(messageGroup);
    }
  }, [messageGroup]);

  return (
    <div className="alertaz-box">
      <div className="alertaz-col">
        {alerts && alerts.length > 0
          ? alerts.map((alrt, i) => {
              const { message, type } = alrt;
              return (
                <div key={i} className={`alerta ${type}`}>
                  <span className={type}>{message}</span>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Alertaz;
