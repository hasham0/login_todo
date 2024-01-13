import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import App from "../App";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import TodoApp from "../pages/TodoApp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "todo",
        element: <TodoApp />,
      },
    ],
  },
]);
