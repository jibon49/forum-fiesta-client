import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AdPost from "../Pages/Dashboard/AdPost/AdPost";
import PostDetails from "../Pages/PostDetails/PostDetails";
import MyPost from "../Pages/MyPost/MyPost";

export const router = createBrowserRouter([

  
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/post-details/:id',
        element: <PostDetails></PostDetails>,
        loader:({params})=>fetch(`http://localhost:5000/posts/${params.id}`)
      }
    ]
  },


  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'ad-post',
        element: <AdPost></AdPost>
      },
      {
        path:'my-post',
        element:<MyPost></MyPost>
      }
    ]
  }
]);