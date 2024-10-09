import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
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
    path: "/card/:listID/:cardID",//:=param,
    element: <Card/>
  }
])
//
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <RouterProvider router={router} />
     </Provider>
  </StrictMode>
)
