import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Card,
  Divider,
  Stack,
  Grid
} from "@mui/material";

export default function Home() {

  return (
    <>
      <Navbar />
      <Container>
        <Box
          sx={{
            mt: "6em",
            p: "2em",
            textAlign: "center"
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={6} lg={3}>
              <h1>Home</h1>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}