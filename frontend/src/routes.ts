
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatorUploadPage from "./components/creator/CreatorUploadPage";
import CreatorDashboard from "./pages/CreatorDashboard";
import VideoGrid from "./components/creator/video/VideoGrid";
import CreatorVideoPage from "./components/creator/video/VideoPage";
import CreatorVideoForm from "./components/creator/CreatorUploadPage";
import Main from "./components/creator/Main";
import VideoPage from "./components/video/VideoPage";

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "creator-upload", Component: CreatorUploadPage },
      { path: "login", Component: Login },
      { path: "video/:id", Component: VideoPage },
      { path: "signup", Component: Signup },
    ],
  },
  {
    path: "/creator-dashboard",
    Component: CreatorDashboard,
    children: [
      { index: true, Component: Main },
      { path: "my-video", Component: VideoGrid },
      { path: "video/:id", Component: CreatorVideoPage },
      { path: "new-video", Component: CreatorVideoForm },
      { path: "video/edit/:id", Component: CreatorVideoForm }
      
    ],
  },
]);
