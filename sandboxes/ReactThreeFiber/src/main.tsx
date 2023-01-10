import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import GrabTest from "./pages/GrabTest";
import TouchGrid from "./pages/TouchGrid";
import Suprematism from "./pages/Suprematism";
import BlenderTest from "./pages/BlenderTest";
import IceWorld from "./pages/IceWorld";
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
  {
    path: "/touch-grid",
    element: <TouchGrid/>,
  },
  {
    path: "/suprematism",
    element: <Suprematism/>,
  },
  {
    path: "/blendertest",
    element: <BlenderTest/>,
  },
  {
    path: "/iceworld",
    element: <IceWorld/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="Home">
    <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);