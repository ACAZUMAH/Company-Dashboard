import { routesEndpoints } from "../constants";
import { Authenticated, ErrorComponent, WelcomePage } from "@refinedev/core";
import { Outlet, RouteObject } from "react-router-dom";
import { Home } from "../Home";
import { Login } from "../login";
import { CatchAllNavigate } from "@refinedev/react-router";
import Mainlayout from "../layouts/main";
import { CompanyList } from "@/Companies";
import { CreateCompany, UpdateCompany } from "@/Companies/components";
import { Task } from "@/Tasks";
import { CreateTask, UpdateTask } from "@/Tasks/components";

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
            path: routesEndpoints.UPDATE_COMPANY,
            element: <UpdateCompany />,
          },
        ],
      },
      {
        path: routesEndpoints.TASK,
        element: (
          <Task>
            <Outlet />
          </Task>
        ),
        children: [
          { path: routesEndpoints.CREATE_TASK, element: <CreateTask /> },
          { path: routesEndpoints.UPDATE_TASK, element: <UpdateTask /> },
        ],
      },
      {
        path: "*",
        element: <ErrorComponent />,
      },
    ],
  },
  {
    path: routesEndpoints.LOGIN,
    element: <Login />,
  },
];
