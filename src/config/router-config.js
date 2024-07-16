import {createBrowserRouter} from "react-router-dom";

import RootLayout from '../layout/RootLayout';
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SignUpPage from "../pages/auth/SignUpPage";

const homeRouter = [
  {
    index: true,
    element: <div>hi</div>,
  },
  {
    path: '/sign-up',
    element: <SignUpPage/>
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
        element: <div>store page</div>
      },
      {
        path: '/customer',
        element: <div>customer page</div>
      }
    ]
  },
]);