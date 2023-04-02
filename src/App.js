import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Questions from './components/Questions';
import Test from './components/Test';
import Result from './components/Result';
import PrivateRoute from './components/privateRoute';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'questions',
      element: <Questions />,
    },
    {
      path: 'test',
      element: (
        <PrivateRoute>
          <Test />
        </PrivateRoute>
      ),
    },
    {
      path: 'result',
      element: (
        <PrivateRoute>
          <Result />
        </PrivateRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
