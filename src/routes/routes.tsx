import { routesEndpoints } from "../constants";
import { Authenticated, WelcomePage } from "@refinedev/core";
import { Outlet, RouteObject } from "react-router-dom";
import { Home } from "../Home";
import { Register } from "../pages/register";
import { Login } from "../pages/login";
import { ForgotPassword } from "../pages/forgotPassword";
import { CatchAllNavigate } from "@refinedev/react-router";
import Mainlayout from "../layouts/main";

export const routes: RouteObject[] = [
  {
    path: routesEndpoints.HOME,
    element: (
      <Authenticated
        key="authenticated-layaout"
        fallback={<CatchAllNavigate to="/login" />}
      >
        <Mainlayout>
          <Outlet />
        </Mainlayout>
      </Authenticated>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: routesEndpoints.LOGIN,
    element: <Login />,
  },
  {
    path: routesEndpoints.REGISTER,
    element: <Register />,
  },
  {
    path: routesEndpoints.FORGOTPASSWORD,
    element: <ForgotPassword />,
  },
];
