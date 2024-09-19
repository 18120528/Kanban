import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
  Route} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import LoginForm from './Components/LoginForm'
import Board from './Components/Board.jsx'
import Card from './Components/Card.jsx' 
//
const router=createBrowserRouter([
  {
    path: "/",
    element: <LoginForm/>
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
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
