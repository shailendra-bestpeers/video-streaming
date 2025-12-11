import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatorDashboard from "./pages/CreatorDashboard";
import VideoGrid from "./components/creator/video/VideoGrid";
import CreatorVideoPage from "./components/creator/video/VideoPage";
import CreatorVideoForm from "./components/creator/CreatorUploadPage";
import Main from "./components/creator/Main";
import VideoPage from "./components/video/VideoPage";
import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./components/admin/users/UsersPage";
import Unauthorized from "./pages/Unauthorized";
import { protect } from "./utils/protect";
import AdminVideoGrid from "./components/admin/video/VideoGrid";

export default createBrowserRouter([
  { path: "/unauthorized", Component: Unauthorized },
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "video/:id",  Component: protect(VideoPage, ["viewer","creator", "admin"]) },
      { path: "signup", Component: Signup },
    ],
  },
  {
    path: "/creator-dashboard",
    Component: protect(CreatorDashboard, ["creator", "admin"]), 
    children: [
      { index: true, Component: Main },
      { path: "my-video", Component: VideoGrid },
      { path: "video/:id", Component: CreatorVideoPage },
      { path: "new-video", Component: CreatorVideoForm },
      { path: "video/edit/:id", Component: CreatorVideoForm },
    ],
  },
  {
    path: "/admin-dashboard",
    Component: protect(AdminDashboard, ["admin"]), 
    children: [
      { index: true, Component: Main },
      { path: "all-video", Component: AdminVideoGrid },
      { path: "video/:id", Component: CreatorVideoPage },
      { path: "new-video", Component: CreatorVideoForm },
      { path: "video/edit/:id", Component: CreatorVideoForm },
      { path: "user", Component: UsersPage },
    ],
  },
]);
