import React, { useContext } from "react";
import { Context } from "../store/appContext";
import crMap from "../../img/crmap.png";
import LoginForm from "../component/login_form";

export const Home = () => {
  const { store } = useContext(Context);
  const dataValla = store.allVallas;
  const dataOwner = store.allOwners;
  const {login_alert} = store;

  return (
    <div className="text-center mt-5">
      <p className="m-5">
        <img src={crMap} style={{ width: "250px" }} />
      </p>
      <LoginForm />
      
      <div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>
      <div>
        <div>Cantidad de vallas: {dataValla.length || "Fetch not working"}</div>
        <div>Cantidad de propietarios: {dataOwner.length || "Fetch not working"}</div>
      </div>
    </div>
  );
};
