const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null || sessionStorage.getItem("token"),
      current_user: null,
      current_user_data: [],
      isAuth: null,

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
      updatedValla: null,
    },

    actions: {
      /////////////////////////////////////////////////////////////////  REGISTER USER

      register: (name, email, password, role) => {
        fetch(process.env.BACKEND_URL + "/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Register data from the backend: ", data);
          })
          .then(() => window.location.reload()) // this reloads the home page to show the current user
          .catch((error) => console.log("Error when register", error));
      },

      /////////////////////////////////////////////////////////////////  LOG IN

      login: (email, password) => {
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
            console.log("This came from the backend", data),
              sessionStorage.setItem("token", data.access_token),
              setStore({ token: data.access_token });
          })
          .then(() => window.location.reload()) // this reloads the home page to show the current user
          .catch((error) => console.log("Error when login", error));
      },
      //////////////////////////////////////////////////////////////////////////LOG OUT
      logout: () => {
        sessionStorage.removeItem("token");
        console.log("Logged out");
        setStore({ token: null });
      },

      //////////////////////////////////////////////////////////////////////////// SYNC TOKEN
      syncTokenFromSessionStorage: () => {
        const token = sessionStorage.getItem("token");
        console.log(
          "App just Loaded, synching token from SessionStorage to store"
        );
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },
      //////////////////////////////////////////////////////////////////////// GET CURRENT USER
      getCurrentUser: () => {
        const store = getStore();
        // const SessionToken = sessionStorage.getItem("token");
        const options = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(process.env.BACKEND_URL + "/api/private", options)
          .then((resp) => resp.json())
          .then((data) => {
            setStore({ current_user: data.name, current_user_data: data }),
              console.log("The current user is: " + data.name);
          })
          .catch((error) =>
            console.log("Error loading current_user from backend", error)
          );
      },

      //////////////////////////////////////////////////////////////////////// Is Auth
      isAuthStatus: () => {
        const store = getStore();
        const status = "standardUser";
        if (
          store.current_user &&
          store.current_user != null &&
          store.current_user != undefined
        ) {
          setStore({ isAuth: status });
        }
        console.log("her goes isAuth function", status);
      },

      //////////////////////////////////////////////////////////////////////// GET All vallas
      getVallas: () => {
        fetch(process.env.BACKEND_URL + "/api/valla")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allVallas: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting all vallas", error));
      },
      ///////////////////////////////////////////////////////////////////////// GET Single valla
      getSingleValla: (id) => {
        const store = getStore();
        const options = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(process.env.BACKEND_URL + "/api/valla/" + id, options)
          .then((res) => res.json())
          .then((data) => {
            setStore({ singleValla: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting single valla", error));
      },

      ///////////////////////////////////////////////////////////////////////DELETE Single valla
      deleteSingleValla: (id) => {
        const store = getStore();
        const options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(process.env.BACKEND_URL + "/api/valla/" + id, options)
          .then((res) => res.json())
          .catch((error) => console.log("Error deleting single valla", error));
      },

      /////////////////////////////////////////////////////////////////  Update single valla
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
        const store = getStore();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
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
        };
        fetch(process.env.BACKEND_URL + "/api/valla/" + id, options)
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
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
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
        };
        fetch(process.env.BACKEND_URL + "/api/valla", options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data), setStore({ newValla: data });
          })
          .catch((error) =>
            console.log("Error when registering new valla", error)
          );
      },
      ///////////////////////////////////////////////////////////////////////////////GET ALL owners table
      getOwners: () => {
        fetch(process.env.BACKEND_URL + "/api/owner")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allOwners: data }), console.log(data);
          })
          .catch((error) => console.log("Error get owners", error));
      },

      getClients: () => {
        ////////////////////////////////////////////////////////////////////////////// GET ALL  clients table
        fetch(process.env.BACKEND_URL + "/api/client")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allClients: data }), console.log(data);
          })
          .catch((error) => console.log("Error get clients", error));
      },

      getUsers: () => {
        ////////////////////////////////////////////////////////////////////////////////////GET ALL users
        fetch(process.env.BACKEND_URL + "/api/user")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allUsers: data }), console.log(data);
          })
          .catch((error) => console.log("Error get users", error));
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
