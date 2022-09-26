const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,

      allVallas: [],
      allOwners: [],
      allClients: [],
      registerNewValla: "",
    },

    actions: {
      getVallas: () => {
        //fetching vallas table
        fetch(process.env.BACKEND_URL + "/api/valla")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allVallas: data }), console.log(data);
          })
          .catch((error) => console.log("Error get vallas", error));
      },

      getOwners: () => {
        //fetching owners table
        fetch(process.env.BACKEND_URL + "/api/owner")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allOwners: data }), console.log(data);
          })
          .catch((error) => console.log("Error get owners", error));
      },

      getClients: () => {
        //fetching  clients table
        fetch(process.env.BACKEND_URL + "/api/client")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allClients: data }), console.log(data);
          })
          .catch((error) => console.log("Error get clients", error));
      },
      // put
      postNewValla: (code, name, format, view, route, user) => {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getStore().token,
          },
          body: JSON.stringify({
            code: code,
            name: name,
            format: format,
            view: view,
            route: route,
            user: user,
          }),
        };
        fetch(process.env.BACKEND_URL + "/api/valla/", requestOptions)
          .then((response) => response.json())
          .then((data) => setStore({ registerNewValla: data }))
          .catch((error) =>
            console.log("Error when registering new valla", error)
          );
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
