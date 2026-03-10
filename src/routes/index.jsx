import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";
import { ErrorRoutes } from "./error-router";
import ProductDetail from "@/pages/products/detail";
import GuestRoute from "@/components/auth-guard";

const Login = lazy(() => import("@/pages/sys/Login"));
const MainLayout = lazy(() => import("@/pages/layout"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Products = lazy(() => import("@/pages/products"));

export default function Router() {
  const PAGE_NOT_FOUND_ROUTE = {
    path: "*",
    element: <Navigate to="/404" replace />,
  };

  const LoginRoutes = {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  };

  const MainRoutes = {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  };

  const routes = [MainRoutes, LoginRoutes, PAGE_NOT_FOUND_ROUTE, ErrorRoutes];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
