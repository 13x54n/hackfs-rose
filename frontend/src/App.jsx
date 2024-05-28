import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { useActiveAccount } from "thirdweb/react";

export default function Router() {
  const account = useActiveAccount();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>{account ? <Navigate to="/dashboard" /> : <Landing />}</Layout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Layout>{!account ? <Navigate to="/" /> : <Dashboard />}</Layout>
      ),
    },
    {
      path: "*",
      element: <>404 Not Found</>,
    },
  ]);

  return <RouterProvider router={router} />;
}
