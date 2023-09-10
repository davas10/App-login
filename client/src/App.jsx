import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/Login/Username';
//import Profile from './components/Login/Profile';
import Recovery from './components/Login/Recovery';
import Reset from './components/Login/Reset';
import PageNotFound from './components/Login/PageNotFound';
import Dashboard from './components/Dashboard/Dashboard';

/** auth middleware */
import { AuthorizeUser } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/dashboard',
        element : <AuthorizeUser><Dashboard /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
