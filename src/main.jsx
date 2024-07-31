import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Protected as AuthLayout} from "./components/Authlayout.jsx"

//import pages
import Home from './pages/Home.jsx'
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import AllpostsPage from './pages/AllpostPage.jsx'
import AddpostPage from "./pages/AddpostPage.jsx"
import Post from './pages/Post.jsx'
import EditpostPage from './pages/EditepostPage.jsx'




const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children: [
      {
          path: "/",
          element: <Home />,
      },
      {
          path: "/login",
          element: (
              <AuthLayout authentication={false}>
                  <LoginPage/>
              </AuthLayout>
          ),
      },
      {
          path: "/signup",
          element: (
              <AuthLayout authentication={false}>
                  <SignupPage/>
              </AuthLayout>
          ),
      },
      {
          path: "/all-posts",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AllpostsPage/>
              </AuthLayout>
          ),
      },
      {
          path: "/add-post",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddpostPage/>
              </AuthLayout>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                 <EditpostPage/>
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post/>,
      },
  ],
  },
])






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
   <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
