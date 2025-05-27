import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import Auth from "./pages/auth";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/route/PrivateRoute";
import { AuthRoute } from "./components/route/AuthRoute";
import { ContactProvider } from "./context/ContactContext";
import { SocketProvider } from "./context/SocketContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />,
      </PrivateRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <Chat />,
      </PrivateRoute>
    ),
  },
  {
    path: "/auth",
    element: (
      <AuthRoute>
        <Auth />
      </AuthRoute>
    ),
  },

  //catch all non-existant routes
  {
    path: "*",
    element: <Navigate to="/auth" replace={true} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ContactProvider>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </ContactProvider>
    </AuthProvider>
  </StrictMode>
);
