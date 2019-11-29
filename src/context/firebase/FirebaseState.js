// Идея state - оборачиваем все приложение в state, чтобы его дочерние элементы доступ до состояния контекста

import React, { useReducer } from "react";
import Axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER } from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    showLoader();
    const res = await Axios.get(`${url}/notes.json`);

    console.log("fetchNotes", res.data);
  };

  const addNote = async title => {
    const note = {
      title,
      date: new Date().toJSON()
    };

    try {
      const res = await Axios.post(`${url}/notes.json`, note);

      const payload = {
        ...note,
        id: res.data.name
      };

      dispatch({
        type: ADD_NOTE,
        payload
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeNote = async id => {
    await Axios.delete(`${url}/notes/${id}.json`);

    dispatch({
      type: REMOVE_NOTE,
      payload: id
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addNote,
        removeNote,
        fetchNotes,
        loading: state.loading,
        notes: state.notes
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
