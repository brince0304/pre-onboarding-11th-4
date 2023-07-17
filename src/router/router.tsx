import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import React from 'react';
import App from '../App';
import Main from '../pages/Main';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);

const CustomRouterProvider = () => {
  return <RouterProvider router={browserRouter} />;
};

export default CustomRouterProvider;
