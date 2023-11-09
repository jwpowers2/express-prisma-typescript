import * as React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [cookies, setCookie] = useCookies(["identity_token"]);

  return {
    authed,
    login(payload) {
      return new Promise((resolve, reject) => {
        setCookie("identity_token", localStorage.getItem("identity_token"));
        axios
          .post("http://localhost:5000/login", payload, {
            withCredentials: true
          })
          .then(result => {
            console.log(result.data);
            if (result.data.error === "") {
              setAuthed(true);
              resolve(result.data.message);
            } else {
              reject(result.data.error);
            }
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    logout(token) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "http://localhost:8080/logout",
            { token },
            { withCredentials: true }
          )
          .then(response => {
            if (response.data.error === "") {
              setAuthed(false);
              setCookie("identity_token", "");
              localStorage.setItem("identity_token", "")
              resolve(true);
            } else {
              reject(false);
            }
          });
      });
    },
    validate(token) {
      return new Promise((resolve, reject) => {
        console.log("validate token");
        setCookie("identity_token", localStorage.getItem("identity_token"));
        axios
          .post(
            "http://localhost:5000/validate",
            { token },
            { withCredentials: true }
          )
          .then(response => {
            if (response.data.error === "") {
              setAuthed(true);
              resolve();
            } else {
              localStorage.setItem("identity_token", "");
              setAuthed(false);
              reject();
            }
          })
          .catch(e => {
            console.log("not valid");
          });
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}