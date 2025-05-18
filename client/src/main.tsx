import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/userArea/Home.component.js';
import MakeOrder from './components/userArea/MakeOrder.component.js';
import SignIn from './components/userArea/SignIn.js';
import SignUp from './components/userArea/SignUp.js';
import { AuthProvider } from './services/auth.provider.js';
import AdminDashboard from './components/adminArea/AdminDashboard.component.js';
import ProtectedRoute from './components/ProtectedRoute.component.js';
import Unauthorized from './components/Unauthorized.component.js';
import Header from './components/Header.component.js';
import BusinessDetails from './components/adminArea/BusinessDetails.component.js';
import EventList from './components/adminArea/EventsList.component.js';
import UsersList from './components/adminArea/UsersList.component.js';
import TypesOfEvents from './components/adminArea/TypesOfEvents.component.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/makeOrder',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'user']} routeFor={"signin"}>
            <MakeOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']} routeFor={"unauthorized"}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'events',
            element: <EventList />,
          },
          {
            path: 'business',
            element: <BusinessDetails />,
          },
          {
            path: 'users',
            element: <UsersList />,
          },
          {
            path: 'events-types',
            element: <TypesOfEvents />,
          },
        ],
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/unauthorized',
        element: <Unauthorized />,
      },
      {
        path: '',
        element: <Home />,
      },
    ],
    errorElement: (
      <>
        <Header />
        <p>oops :( not exists...</p>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
