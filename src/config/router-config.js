import {createBrowserRouter} from "react-router-dom";

import RootLayout from '../layout/RootLayout';
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import StoreSignUpPage from "../pages/auth/StoreSignUpPage";
import CustomerSignUpPage from "../pages/auth/CustomerSignUpPage";
import CustomerLoginPage from "../pages/auth/CustomerLoginPage";
import StoreLoginPage from "../pages/auth/StoreLoginPage";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage";




const homeRouter = [
  {
    index: true,
    element: <div>hi</div>,
  },
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
      },
        {
          path: 'customer-signUp',
          element: <CustomerSignUpPage />
        },
        {
          path: 'store-signUp',
          element: <StoreSignUpPage />
        },
        {
          path: 'customer-login',
          element: <CustomerLoginPage />
        },
        {
          path: 'store-login',
          element: <StoreLoginPage />
        },
        {
          path: 'email-verification',
          element: <EmailVerificationPage />
        },
      ]
    },
]);