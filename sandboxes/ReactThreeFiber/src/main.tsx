import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import GrabTest from "./pages/GrabTest";
import TouchGrid from "./pages/TouchGrid";
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="Home">
    <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);