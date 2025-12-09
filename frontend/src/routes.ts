
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatorUploadPage from "./pages/CreatorUploadPage";
import VideoPage from "./components/video/VideoPage";

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "creator-upload", Component: CreatorUploadPage },
      {
  path: "video/:id",
  Component: VideoPage,
},
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
]);
