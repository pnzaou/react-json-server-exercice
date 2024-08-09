import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import OrderPage from './pages/OrderPage';
import Login from './pages/Login';
import Dashbord from './pages/Dashbord';
import ProtectedRoute from './components/Protected-route';
import Analyses from './components/Analyses';
import BurgersListAdmin from './components/BurgersListAdmin';
import OrderListAdmin from './components/OrderListAdmin';
import BurgerDetails from './components/BurgerDetails';
import AddBurger from './pages/Add-burger';
import EdiBurger from './pages/Edit-burger';
import OrderDetails from './components/OrderDetails';


const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path: "/commander/:id",
    element: <OrderPage/>
  },
  {
    path:'/admin-login',
    element: <Login/>
  },
  {
    path: '/admin-dashboard',
    element: <ProtectedRoute><Dashbord/></ProtectedRoute>,
    children: [
      {
        path:'/admin-dashboard',
        element: <Analyses/>
      },
      {
        path: '/admin-dashboard/burgers',
        element: <BurgersListAdmin/>
      },
      {
        path: '/admin-dashboard/burgers/:id',
        element: <BurgerDetails/>
      },
      {
        path: '/admin-dashboard/burgers/ajouter',
        element: <AddBurger/>
      },
      {
        path: '/admin-dashboard/burgers/modifier/:id',
        element: <EdiBurger/>
      },
      {
        path: '/admin-dashboard/orders',
        element: <OrderListAdmin/>
      },
      {
        path: '/admin-dashboard/orders/:id',
        element: <OrderDetails/>
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <Toaster/>
  </React.StrictMode>
);
