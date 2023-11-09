import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Card
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { useCookies, removeCookie } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setRole, setFeedbackMessage, setId } from "../imageSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["identity_token"]);
  const feedbackMessage = useSelector(state => state.feedbackMessage);
  const role = useSelector(state => state.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();

  const authenticateUser = () => {
    login({ email, password }).then(message => {
      // removeCookie("identity_token")
      console.log(role);
      console.log(message);
      console.log(`login token is ${message.token}`);
      localStorage.setItem("identity_token", message.token);
      setCookie("identity_token", message.token);
      dispatch(setFeedbackMessage("You've been logged in"));
      dispatch(setRole(message.role));
      dispatch(setId(message.id));
      navigate("/");
    });
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: "4em", p: "2em", width: "30%" }}>
        <Typography
          variant="h4"
          sx={{
            mt: "2em",
            fontFamily: "'Rajdhani', sans-serif",
            color: "white",
            textShadow: "2px 2px black",
            backgroundColor: "#e65c00",
            borderTop: "4px solid black",
            borderRight: "4px solid black",
            borderLeft: "4px solid black",
            p: "1em"
          }}
          textAlign="center"
        >
          Login
        </Typography>

        <Stack
          sx={{
            m: "0 auto",
            p: "2em",
            backgroundColor: "white",
            borderBottom: "4px solid black",
            borderRight: "4px solid black",
            borderLeft: "4px solid black"
          }}
        >
          <TextField
            variant="standard"
            sx={{ mb: "2em", color: "#e65c00" }}
            style={{ color: "#e65c00" }}
            value={email}
            label="email"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="standard"
            sx={{ mb: "4em" }}
            value={password}
            label="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            sx={{
              color: "black",
              border: "1px solid black",
              borderRadius: "0",
              backgroundColor: "#e65c00",
              fontFamily: "'Rajdhani', sans-serif",
              color: "white",
              textShadow: "2px 2px black"
            }}
            label="login"
            onClick={authenticateUser}
          >
            login
          </Button>
        </Stack>
      </Container>
    </>
  );
}