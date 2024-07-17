import React from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router-config";
import {Reset} from "styled-reset";

import MainPage from './pages/userMain/MainPage';


const App = () => {
  
  return (
      <>
        <Reset />
        <RouterProvider router={router} />
        <MainPage />
      </>
  );
};

export default App;
