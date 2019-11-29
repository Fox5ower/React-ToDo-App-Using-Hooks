import React from "react";

export const Alert = ({ alert }) => {
  if (!alert) {
    return null;
  }

  return (
    <div className={`alert alert-${alert.type || "warning"} alert-dismissable`}>
      <strong>Alert!</strong>
      {alert.text}
      <button type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};
