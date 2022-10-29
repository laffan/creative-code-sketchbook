import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import GrabTest from "./pages/GrabTest";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './scss/main.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/grab-test",
    element: <GrabTest/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);