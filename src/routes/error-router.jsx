import { SpinnerCustom } from "@/components/loading/circle_loading";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Page404 = lazy(() => import("@/pages/sys/error/404"));
export const ErrorRoutes = {
  element: (
    <div className="h-screen w-full">
      <Suspense fallback={<SpinnerCustom />}>
        <Outlet />
      </Suspense>
    </div>
  ),
  children: [{ path: "404", element: <Page404 /> }],
};
