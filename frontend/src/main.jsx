import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider } 
  from 'react-router-dom'
import './index.css'
import WelcomeForm from './Components/WelcomeForm/WelcomeForm.jsx'
import Board from './Components/Board.jsx'
import Card from './Components/Card/Card.jsx' 
//
const router=createBrowserRouter([
  {
    path: "/",
    element: <WelcomeForm/>
  },
  {
    path: "/board",
    element: <Board/>
  },
  {
    path: "/card/:listId/:cardId",//:=param,
    element: <Card/>
  }
])
//
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
