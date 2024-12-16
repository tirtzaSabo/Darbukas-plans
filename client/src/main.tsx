import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/userArea/Home.component.js';
import MakeOrder from './components/userArea/MakeOrder.component.js';
import SignIn from './components/userArea/SignIn.js';
import SignUp from './components/userArea/SignUp.js';
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [{
      path: '/home',
      Component: Home,
    }, {
      path: '/makeOrder',
      Component: MakeOrder,
    },
    {
      path: '/signin',
      Component: SignIn,
    },
    {
      path: '/signup',
      Component: SignUp,
    }, {
      path: '',
      Component: Home,
    }],
    errorElement: <p> oops :( not exists... </p>,
  },
]);
 ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)
