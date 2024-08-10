import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../page/Home'
import Login from '../page/Login'
import Register from '../page/Register'
import NotFound from '../page/NotFound'
import List from '../page/List'
import Trash from '../page/Trash'
import Start from '../page/Start'
import Stat from '../page/question/Stat'
import Edit from '../page/question/Eidt'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      { path: 'home', element: <Home /> },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          { path: 'list', element: <List /> },
          { path: 'trash', element: <Trash /> },
          { path: 'start', element: <Start /> },
        ],
      },
    ],
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      { path: 'edit/:id', element: <Edit /> },
      { path: 'stat/:id', element: <Stat /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

export default router
