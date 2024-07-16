import {createBrowserRouter, Outlet} from "react-router-dom";

import RootLayout from '../layout/RootLayout';
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
// import StoreMyPageEdit from "../pages/store/StoreMyPageEdit";
// import StoreMyPage from "../pages/store/StoreMyPage";
import StoreRegisterPage from "../pages/store/StoreRegisterPage";

const homeRouter = [
  {
    index: true,
    element: <div>hi</div>,
  },
  {
    path: '/sign-in',
    element: <div>sign-in page</div>
  }
];

const storeRouter = [
  {
    path: 'edit',
    // element: <StoreMyPageEdit />
  },
  {
    path: 'approval',
    element: <StoreRegisterPage />
  }
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: '/',
        element: <Home />,
        children: homeRouter,
      },
      {
        path: '/store',
        // element: <StoreMyPage />,
        children: storeRouter
      },
      {
        path: '/customer',
        element: <div>customer page</div>
      }
    ]
  },
]);