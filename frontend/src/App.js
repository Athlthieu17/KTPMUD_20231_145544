import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import Event from "./pages/Event";
import Profile from "./pages/Profile";

import ModalLogin from "./components/modals/ModalLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/event",
    element: (
      <ProtectedRoute isShowAction={true}>
        <Event />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute isShowAction={true}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
        {
            !localStorage.getItem("token") && <ModalLogin/>
        }
      </AuthProvider>
    </div>
  );
}

export default App;
