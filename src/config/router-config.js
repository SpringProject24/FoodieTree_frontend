import {createBrowserRouter} from "react-router-dom";

import RootLayout from '../layout/RootLayout';
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
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
        element: <div>store page</div>,
        children: [
          {
            path: '/approval',
            element: <StoreRegisterPage/>,
          }
        ]
      },
      {
        path: '/customer',
        element: <div>customer page</div>
      }
    ]
  },
]);