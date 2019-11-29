// State - component wrapping our app to provide our functions into it to work with alert

import React, { useReducer } from "react";
import { AlertContext } from "./alertContext";
import { SHOW_ALERT, HIDE_ALERT } from "../types";
import { alertReducer } from "./alertReducer";

export const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, { visible: false });

  const show = (text, type = "warning") => {
    dispatch({
      type: SHOW_ALERT,
      payload: { text, type }
    });
  };

  const hide = () => dispatch({ type: HIDE_ALERT });

  return (
    <AlertContext.Provider value={{ show, hide, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};
