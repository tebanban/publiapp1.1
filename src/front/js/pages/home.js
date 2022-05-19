import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logoCover from "../../img/logo-publiex.png";
import "../../styles/home.scss";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const datavalla = store.allVallas;

  console.log(process.env.VARIABLE_NAME);
  console.log(store.allVallas);

  return (
    <div className="text-center mt-5">
      <p className="m-5">
        <img src={logoCover} />
      </p>
      <div className="alert alert-info">
        {store.message || "Loading message from the backend..."}
      </div>
      <div>
        <div>Cantidad de vallas: {datavalla.length || "Fetch not workin"}</div>
      </div>
    </div>
  );
};
