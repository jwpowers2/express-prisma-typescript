import axios from "axios";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "../botlistLogo.svg";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../hooks/useAuth";
import Feedback from "./Feedback";
import { useSelector, useDispatch } from "react-redux";
import { setFeedbackMessage } from "../imageSlice";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { authed, logout, validate } = useAuth();
  const [searchVal, setSearchVal] = useState();
  const feedbackMessage = useSelector(state => state.feedbackMessage);
  let role = useSelector(state => state.role);
  const dispatch = useDispatch();

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setOpen(open);
  };
  const followLink = e => {
    setOpen(false);
    navigate(e.target.value);
  };

  const handleLogout = e => {
    logout(localStorage.getItem("identity_token"))
      .then(result => {
        dispatch(setFeedbackMessage("You've been logged out"));
        setOpen(false);
        navigate("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const search = () => {
    console.log(searchVal);
    // fetch to back end for articles
    //const testResults = [{name:"test"}]
    //navigate("/articles", {state: {testResults}})
  };

  useEffect(() => {
    /*
    validate(localStorage.getItem("identity_token"))
      .then(() => {
        const validator = setInterval(() => {
          validate(localStorage.getItem("identity_token"));
        }, 5000);
        return () => {
          clearInterval(validator);
        };
      })
      .catch(() => {
        // navigate("/");
      });
      */
    console.log(role);
  }, [role]);

  return (
    <AppBar
      position="absolute"
      sx={{
        zIndex: theme => theme.zIndex.drawer + 10,
        color: "black",
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "4px dashed black"
      }}
    >
      <Toolbar>
        <Box>
          <Link to="/">
            <SvgIcon viewBox="0 0 70 70" sx={{ height: "2em", width: "2em" }}>
              <Logo />
            </SvgIcon>
          </Link>
        </Box>
        <Typography
          variant="h4"
          sx={{
            flexGrow: "1",
            fontWeight: 700,
            paddingLeft: ".5em",
            color: "black",
            textDecoration: "none",
            fontFamily: "'Rajdhani', sans-serif"
          }}
        >
          Image
        </Typography>
        <Feedback />
        <IconButton
          edge="start"
          color="black"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          sx={{
            display: {
              xs: "block",
              color: "black"
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
            sx={{
              pt: 10,
              height: 1,
              backgroundColor: "white",
              color: "black"
            }}
          >
            <IconButton sx={{ pb: ".5em", color: "black", pr: ".5em" }}>
              <CloseIcon onClick={toggleDrawer(false)} />
            </IconButton>
            <Stack style={{ color: "black" }}>
              <Container sx={{ textAlign: "center", pb: "1em" }}>
                <TextField
                  label="search by topic"
                  sx={{ width: "15em" }}
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  variant="standard"
                ></TextField>
                <Button onClick={search}>
                  <SearchIcon />
                </Button>
              </Container>
              {authed && role !== "user" && (
                <Button value="/home/contributors" onClick={followLink}>
                  contributors
                </Button>
              )}
              {authed && role !== "user" && (
                <Button value="/home/lists" onClick={followLink}>
                  not approved articles
                </Button>
              )}
              {authed && (
                <Button value="/home/messages" onClick={followLink}>
                  messages
                </Button>
              )}
              {authed && (
                <Button value="/home/series" onClick={followLink}>
                  series
                </Button>
              )}
              {authed && (
                <Button value="/home/articlepanel" onClick={followLink}>
                  article panel
                </Button>
              )}
              <Button value="/login" onClick={followLink}>
                login
              </Button>
              {authed && <Button onClick={handleLogout}>logout</Button>}
            </Stack>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}