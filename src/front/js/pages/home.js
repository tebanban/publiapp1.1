import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logoCover from "../../img/logo-publiex.png";
import "../../styles/home.scss";
import { Login } from "../component/login"

export const Home = () => {
  const { store, actions } = useContext(Context);
  const dataValla = store.allVallas;
  const dataOwner = store.allOwners;


  // console.log(process.env.VARIABLE_NAME);
  console.log(store.allVallas, store.allOwners);

  return (
    <div className="text-center mt-5">
      <p className="m-5">
        <img src={logoCover} style={{"width" : "250px"}}/>
      </p>
      <Login />
      <div className="alert alert-info">
        {store.message || "Loading message from the backend..."}
      </div>
      <div>
        <div>Cantidad de vallas: {dataValla.length || "Fetch not working"}</div>
        <div>
          Cantidad de propietarios: {dataOwner.length || "Fetch not working"}
        </div>
      </div>
    </div>
  );
};
