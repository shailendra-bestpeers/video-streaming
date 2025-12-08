
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      // { path: "about", Component: About },
    ],
  },
]);
