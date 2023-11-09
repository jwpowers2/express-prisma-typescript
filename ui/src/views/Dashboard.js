import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
}