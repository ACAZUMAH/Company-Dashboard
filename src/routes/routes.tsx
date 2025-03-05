import { routesEndpoints } from "../constants";
import { Authenticated, WelcomePage } from "@refinedev/core";
import { Outlet, RouteObject } from "react-router-dom";
import { Home } from "../Home";
import { Login } from "../login";
import { CatchAllNavigate } from "@refinedev/react-router";
import Mainlayout from "../layouts/main";
import { CompanyList } from "@/Companies";
import { CreateCompany } from "@/Companies/components";

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
      {
        path: routesEndpoints.COMPANIES,
        children: [
          { index: true, element: <CompanyList /> },
          {
            path: routesEndpoints.CREATE_COMPANY,
            element: <CreateCompany />,
          },
          {
            
          }
        ],
      },
    ],
  },
  {
    path: routesEndpoints.LOGIN,
    element: <Login />,
  },
];
