import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Articles from './pages/Articles.jsx'
import NotFound from './pages/NotFound.jsx'
import Article from './pages/Article.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Services from './pages/Services.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Protected from './components/Protected.jsx'
import Login from './pages/Login.jsx'
import { AuthProvider } from './hooks/AuthProvider.jsx'

import Activate from './pages/Activate.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm.jsx'




const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>

      },
      {
        path:'articles',
        element:(
          <ProtectedRoute>
              <Articles/>
          </ProtectedRoute>
        ),
        children:[
            {
              path:':id',
              element:<Article/>
            }
        ]
      },
      {
        path:'about',
        element:<About/>
             
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {
        path:'services',
        element:<Services/>
      },
      {
        path:'register',
        element:<Register/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'reset-password',
        element:<ResetPassword/>
      },
      {
         path:'password/reset/confirm/:uid/:token',
         element:<ResetPasswordConfirm/>
      },
      {
         path:'activate/:uid/:token',
         element:<Activate/>
      },
      {
        path:"*",
        element:<NotFound/>
      }

    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

   <AuthProvider>
     <RouterProvider router={router}/>
   </AuthProvider>
   
  </React.StrictMode>,
)