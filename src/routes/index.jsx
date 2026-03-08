import Dashboard from "@/pages/dashboard";
import Products from "@/pages/products";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "@/pages/layout";
import Login from "@/pages/sys/Login";

export default function Router() {
  const router = createBrowserRouter([
    {
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
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}
