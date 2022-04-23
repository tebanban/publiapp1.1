import Tempdata from "../../js/store/tempdata.json"; //import fake database

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,

      site: Tempdata, //json object imported

      siteValla: [],
    },

    actions: {
      getVallas: () => {
        //fetching vallas table
        fetch(process.env.BACKEND_URL + "/api/valla")
          .then((res) => res.json())
          .then((data) => {
            setStore({ siteValla: data }), console.log(data);
          })
          .catch((error) => console.log("Error get vallas", error));
      },

      // Use getActions to call a function within a fuction

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
    },
  };
};

export default getState;
