import React, { useEffect, useState } from "react";
import "./Alertaz.scss";
const Alertaz = ({ messageGroup }) => {
  const [alerts, setAlerts] = useState(messageGroup ? messageGroup : []);

  useEffect(() => {
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
