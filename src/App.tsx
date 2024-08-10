import React from 'react'
import List from './page/List'
import { RouterProvider } from 'react-router-dom'
import router from './router'
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
