import React, { Component } from "react";
import {
  createBrowserRouter,
  createBrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Home from "./views/Home";
import Requiredauth from "./components/RequiredAuth";
// import Register from "./views/Register";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: (
      <Requiredauth>
        <Dashboard />
      </Requiredauth>
    )
  }
]);

export { router };