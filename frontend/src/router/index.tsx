import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import IncidentListPage from "../pages/IncidentListPage";
import IncidentDetailPage from "../pages/IncidentDetailPage";
import IncidentCreatePage from "../pages/IncidentCreatePage";
import ServerStatusPage from "../pages/ServerStatusPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/incidents",
    element: <IncidentListPage />,
  },
  {
    path: "/incidents/:id",
    element: <IncidentDetailPage />,
  },
  {
    path: "/incidents/new",
    element: <IncidentCreatePage />,
  },
  {
    path: "/servers",
    element: <ServerStatusPage />,
  },
]);