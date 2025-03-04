import { createBrowserRouter, Outlet, RouterProvider, useRoutes } from "react-router-dom";
import { routes } from "./routes";

export const AppRouter = () => {
    
    // const getRouter = () => {
    //     return createBrowserRouter([{
    //         element: <Outlet />,
    //         children: [ ...routes],
    //     }]);
    // }

    // return <RouterProvider router={getRouter()} />

    return useRoutes(routes)
}