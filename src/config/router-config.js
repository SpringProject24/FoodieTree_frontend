import {createBrowserRouter} from "react-router-dom";
import RootLayout from '../layout/RootLayout';
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import StoreMyPage from "../pages/store/StoreMyPage";

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
    index: true,
    element: <StoreMyPage />
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
        element: <StoreMyPage />,
        children: storeRouter
      },
      {
        path: '/customer',
        element: <div>customer page</div>
      }
    ]
  },
]);