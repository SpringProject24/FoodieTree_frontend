import {createBrowserRouter, Outlet} from "react-router-dom";

import RootLayout from '../layout/RootLayout';
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import StoreMyPageEdit from "../pages/store/StoreMyPageEdit";
import StoreMyPageOutlet from "../pages/store/StoreMyPageOutlet";
import CustomerMyPageOutlet from "../pages/customer/CustomerMyPageOutlet";
import CustomerMyPageEdit from "../pages/customer/CustomerMyPageEdit";

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
    element: <div>storemypage~</div>
  },
  {
    path: 'edit',
    element: <StoreMyPageEdit/>
  }
];

const customerRouter = [
  {
    path: 'edit',
    element: <CustomerMyPageEdit />
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
        element: <StoreMyPageOutlet />,
        children: storeRouter
      },
      {
        path: '/customer',
        element: <CustomerMyPageOutlet />,
        children: customerRouter
      }
    ]
  },
]);