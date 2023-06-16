const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      deleteVallaMessage: null,
      token: null ,
      user: [],
      user_name: null,
      current_user: null,
      current_user_data: [],
      isAuth: null,

      allVallas: [],
      allOwners: [],
      allClients: [],
      allUsers: [],
      allFormats: [],
      singleValla: {
        code: "",
        name: "",
        status: "",
        format: "",
        size: "",
        light: "",
        price_low: "",
        price_high: "",
        view: "",
        route: "",
        lat: "",
        lng: "",
        comment: "",
        user_id: "",
        client_id: "",
        owner_id: "",
      },
      singleFormat: {
        code: "",
        size: "",
        area: "",
        comment: "",
      },
      singleOwner: {
        code: "",
        name: "",
        phone1: "",
        phone2: "",
        comment: "",
        email: "",
        contact: "",
      },
      singleClient: {
        code: "",
        name: "",
        phone1: "",
        phone2: "",
        comment: "",
        email: "",
        contact: "",
      },

      newValla: "",
      newOwner: "",
      newFormat: "",
      newClient: "",
      updatedVallaMessage: "",
    },

    actions: {
      /////////////////////////////////////////////////////////////////  REGISTER USER

      register: (name, email, password, role) => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/register", {
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
          // .then(() => window.location.reload()) // this reloads the home page to show the current user
          .catch((error) => console.log("Error when register", error));
      },

      ///////////////////////////////////////////////////////////////////////DELETE User
      deleteUser: (id) => {
        const store = getStore();
        const options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/" + id, options)
          .then((res) => res.json())
          .catch((error) => console.log("Flux:Error deleting user", error));
      },

      /////////////////////////////////////////////////////////////////  LOG IN

      login: (email, password) => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/token", {
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
            console.log("This came from the backend", data);
            if (data.msg) {
              // Display alert message
              alert(data.msg);
          }

          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token , user_name: data.user_name, user: data.user });
          
          })
          // .then(() => window.location.reload()) // this reloads the home page to show the current user
          .catch((error) => console.log("Error when login", error));
      },
      //////////////////////////////////////////////////////////////////////////LOG OUT
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
        alert("Logged out");
       
      },

      //////////////////////////////////////////////////////////////////////////// SYNC TOKEN
      syncTokenFromSessionStorage: () => {
        const token = sessionStorage.getItem("token");
        console.log("App just Loaded, synching token from SessionStorage to store");
        if (token && token != "" && token != undefined) setStore({ token: token });
      },
      //////////////////////////////////////////////////////////////////////// GET CURRENT USER
      // getCurrentUser: () => {
      //   const store = getStore();
      //   // const SessionToken = sessionStorage.getItem("token");
      //   const options = {
      //     headers: {
      //       Authorization: "Bearer " + store.token,
      //     },
      //   };
      //   fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", options)
      //     .then((resp) => resp.json())
      //     .then((data) => {
      //       setStore({ current_user: data.name, current_user_data: data }), console.log("The current user is: " + data.email);
      //     })
      //     .catch((error) => console.log("Error loading current_user from backend", error));
      // },

      //////////////////////////////////////////////////////////////////////// Is Auth
      isAuthStatus: () => {
        const store = getStore();
        const status = "standardUser";
        if (store.current_user && store.current_user != null && store.current_user != undefined) {
          setStore({ isAuth: status });
        }
        console.log("isAuth function", status); // need to complete this function
      },

      //////////////////////////////////////////////////////////////////////// GET All vallas
      getVallas: () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/valla")
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
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/valla/" + id, options)
          .then((res) => res.json())
          .then((data) => {
            setStore({ singleValla: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting single valla", error));
      },

      ///////////////////////////////////////////////////////////////////////DELETE  valla
      deleteSingleValla: (id) => {
        const store = getStore();
        const options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/valla/" + id, options)
          .then((res) => res.json())
          .then((data) => setStore({ deleteVallaMessage: data.message }))
          .catch((error) => console.log("Error deleting single valla", error));
      },

      /////////////////////////////////////////////////////////////////  Update  valla
      updateValla: (id, inputDataValla) => {
        const store = getStore();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify(inputDataValla),
        };
        console.log("Update valla Body", options.body);
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/valla/" + id, options)
          .then((response) => response.json())
          .then((data, message) => {
            console.log(data), setStore({ updatedVallaMessage: data.message });
          })
          .catch((error) => console.log("Error when updating valla data", error));
      },

      ///////////////////////////////////////////////////////////////////////// UPDATE  valla File
      updateVallaFile: (id, files) => {
        const store = getStore();
        console.log("the files: ", files);
        const body = new FormData();
        body.append("picture_url", files[0]);
        console.log("the body: ", body);
        const options = {
          body,
          method: "PUT",
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/vallaFile/" + id, options)
          .then((response) => response.json())
          .then((data) => {
            console.log("Success updating valla file", data);
          })
          .catch((error) => console.log("Error when updating valla file", error));
      },

      //////////////////////////////////////////////////////////////////////// POST new valla
      postNewValla: (inputDataValla) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify(inputDataValla),
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/valla", options)
          .then((response) => response.json())
          .then((data) => {
            console.log("Success adding new valla", data), setStore({ newValla: data });
          })
          .catch((error) => console.log("Error registering new valla", error));
      },

      ///////////////////////////////////////////////////////////////////////////////GET ALL owners
      getOwners: () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/owner")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allOwners: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting owners", error));
      },

      //////////////////////////////////////////////////////////////////////////////// GET Single Owner
      getSingleOwner: (id) => {
        const store = getStore();
        const options = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/owner/" + id, options)
          .then((res) => res.json())
          .then((data) => {
            setStore({ singleOwner: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting single owner", error));
      },

      ///////////////////////////////////////////////////////////////////////////////// POST new owner
      postNewOwner: (formValues) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify(formValues),
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/owner", options)
          .then((response) => response.json())
          .then((data) => {
            console.log("Success adding new owner", data), setStore({ newOwner: data });
          })
          .catch((error) => console.log("Error registering new owner", error));
      },

      ///////////////////////////////////////////////////////////////// ///////////// Update  Owner
      updateOwner: (id, formValues) => {
        const store = getStore();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify(formValues),
        };
        console.log("Update owner Body", options.body);
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/owner/" + id, options)
          .then((response) => response.json())
          .then((data, message) => {
            console.log(data), setStore({ updatedOwnerMessage: data.message });
          })
          .catch((error) => console.log("Error when updating owner data", error));
      },

      ////////////////////////////////////////////////////////////////////////////// GET ALL  clients
      getClients: () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/client")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allClients: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting clients", error));
      },

      //////////////////////////////////////////////////////////////////////////////// GET Single Client
      getSingleClient: (id) => {
        const store = getStore();
        const options = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/client/" + id, options)
          .then((res) => res.json())
          .then((data) => {
            setStore({ singleClient: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting single client", error));
      },

      /////////////////////////////////////////////////////////////////////////////// POST new client
      postNewClient: (inputDataClient) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify(inputDataClient),
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/client", options)
          .then((response) => response.json())
          .then((data) => {
            console.log("Success adding new owner", data), setStore({ newClient: data });
          })
          .catch((error) => console.log("Error registering new client", error));
      },

      ////////////////////////////////////////////////////////////////////////////////////GET ALL users
      getUsers: () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allUsers: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting users", error));
      },

      getFormats: () => {
        ////////////////////////////////////////////////////////////////////////////////////GET ALL Formats
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/format")
          .then((res) => res.json())
          .then((data) => {
            setStore({ allFormats: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting formats", error));
      },

      ////////////////////////////////////////////////////////////////////////////////// GET Single Format
      getSingleFormat: (id) => {
        const store = getStore();
        const options = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/format/" + id, options)
          .then((res) => res.json())
          .then((data) => {
            setStore({ singleFormat: data }), console.log(data);
          })
          .catch((error) => console.log("Error getting single format", error));
      },

      /////////////////////////////////////////////////////////////////////////////// POST new format
      postNewFormat: (inputDataFormat) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify(inputDataFormat),
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/format", options)
          .then((response) => response.json())
          .then((data) => {
            console.log("Success adding new owner", data), setStore({ newFormat: data });
          })
          .catch((error) => console.log("Error registering new format", error));
      },

      // Use getActions to call a function within a fuction

      resetDeleteVallaMessage: () => {
        setStore({ deleteVallaMessage: null });
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) => console.log("Error loading message from backend", error));
      },
    },
  };
};

export default getState;
