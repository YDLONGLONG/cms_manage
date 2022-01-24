import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import App from "App";
import Loading from "components/Loading";

interface Iroute {
  path: string;
  component: React.FC;
  children?: Iroute[];
}

const routeArr: Iroute[] = [
  {
    path: "/",
    component: App,
    children: [
      { path: "edit", component: lazy(() => import("../pages/Edit")) },
      { path: "list", component: lazy(() => import("../pages/List")) },
      { path: "means", component: lazy(() => import("../pages/Means")) },
    ],
  },
  { path: "/login", component: lazy(() => import("../Login")) },
  { path: "/register", component: lazy(() => import("../Register")) },
];

const MyRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        {
          routeArr.map((item, index) => {
            return(
              item.children ? //有子路由
              <Route key={index} path={item.path} element={<item.component />}>
                {
                  item.children.map((e,i)=><Route key={i} path={e.path} element={<e.component />}></Route>)
                }
              </Route>
            : //无子路由
            <Route key={index} path={item.path} element={<item.component />}></Route>
            )
          }) 
        }
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default MyRouter;