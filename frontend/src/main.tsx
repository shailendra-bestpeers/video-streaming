import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes.ts'
import { AuthProvider } from './context/AuthContext.tsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-loading-skeleton/dist/skeleton.css";


createRoot(document.getElementById('root')!).render(
      <AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} /> 
      <RouterProvider router={routes} />
      </AuthProvider>
)
