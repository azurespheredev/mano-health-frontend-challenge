import { Navigate, createBrowserRouter } from "react-router-dom";
import BasicLayout from "~/layout/BasicLayout";

import NotFoundPage from "~/pages/error/NotFound";
import ClaimsPage from "~/pages/ClaimsPage";
import MRFListPage from "~/pages/MRFListPage";

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/claims"} />,
      },
      {
        path: "/claims",
        element: <ClaimsPage />,
      },
      {
        path: "/mrf-list",
        element: <MRFListPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
