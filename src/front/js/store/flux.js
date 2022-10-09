const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,

      allVallas: [],
      singleValla: {
        code: "",
        name: "",
        typology: "",
        layout: "",
        size: "",
        light: "",
        price_low: "",
        price_high: "",
        view: "",
        route: "",
        comment: "",
        user_id: "",
        client_id: "",
        owner_id: "",
      },
      allOwners: [],
      allClients: [],
      allUsers: [],
      newValla: "",
      updatedValla: "",
      token: ""
    },

    actions: {
      sendCredentials: (email, password) => {
        fetch(process.env.BACKEND_URL + "/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data), setStore({ token: data });
          })
          .catch((error) => console.log("Error when login", error));
      },

      ////////////////////////////////////////////////////////////////////////////////// GET All vallas
      getVallas: () => {
        fetch(process.env.BACKEND_URL + "/api/valla")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allVallas: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting all vallas", error));
      },
      //////////////////////////////////////////////////////////////////////////////////// GET Single valla
      getSingleValla: (id) => {
        fetch(process.env.BACKEND_URL + "/api/valla/" + id)
          .then((res) => res.json())
          .then((data) => {
            setStore({ singleValla: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting single valla", error));
      },

      //////////////////////////////////////////////////////////////////////////////////// DELETE Single valla
      deleteSingleValla: (id) => {
        fetch(process.env.BACKEND_URL + "/api/valla/" + id, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .catch((error) => console.log("Error deleting single valla", error));
      },

      /////////////////////////////////////////////////////////////////// ///////////Update single valla
      updateValla: (
        id,
        code,
        name,
        typology,
        layout,
        size,
        light,
        price_low,
        price_high,
        view,
        route,
        comment,
        user_id,
        client_id,
        owner_id
      ) => {
        fetch(process.env.BACKEND_URL + "/api/valla/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            name: name,
            typology: typology,
            layout: layout,
            size: size,
            light: light,
            price_low: price_low,
            price_high: price_high,
            view: view,
            route: route,
            comment: comment,
            user_id: user_id,
            client_id: client_id,
            owner_id: owner_id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data), setStore({ updatedValla: data });
          })
          .catch((error) =>
            console.log("Error when updating single valla", error)
          );
      },
      ///////////////////////////////////////////////////////////////////POST new valla
      postNewValla: (
        code,
        name,
        typology,
        layout,
        size,
        light,
        price_low,
        price_high,
        view,
        route,
        comment,
        user_id,
        client_id,
        owner_id
      ) => {
        fetch(process.env.BACKEND_URL + "/api/valla", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            name: name,
            typology: typology,
            layout: layout,
            size: size,
            light: light,
            price_low: price_low,
            price_high: price_high,
            view: view,
            route: route,
            comment: comment,
            user_id: user_id,
            client_id: client_id,
            owner_id: owner_id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data), setStore({ newValla: data });
          })
          .catch((error) =>
            console.log("Error when registering new valla", error)
          );
      },
      ///////////////////////////////////////////////////////////////////////////////GET owners table
      getOwners: () => {
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

      getUsers: () => {
        //fetching  clients table
        fetch(process.env.BACKEND_URL + "/api/user")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allUsers: data }), console.log(data);
          })
          .catch((error) => console.log("Error get users", error));
      },
      // post new valla

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
