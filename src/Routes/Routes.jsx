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
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import ReportedComments from "../Pages/ReportedComments/ReportedComments";
import MakeAnnouncement from "../Pages/MakeAnnouncement/MakeAnnouncement";
import StatusError from "../Pages/Error/StatusError";
import UserMembership from "../Pages/UserMembership/UserMembership";
import CheckOut from "../Pages/CheckOut/CheckOut";
import MyPostDetails from "../Pages/MyPostDetails/MyPostDetails";

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
        path : '/statusError',
        element : <StatusError></StatusError>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path:'/membership',
        element : <PrivateRoute><UserMembership></UserMembership></PrivateRoute>
      },
      {
        path:'/checkout',
        element : <CheckOut></CheckOut>
      },
      {
        path:'my-post-details/:id',
        element:<MyPostDetails></MyPostDetails>,
        loader:({params})=>fetch(`http://localhost:5000/posts/${params.id}`)
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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'my-profile',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: 'ad-post',
        element: <PrivateRoute><AdPost></AdPost></PrivateRoute>
      },
      {
        path:'my-post',
        element:<PrivateRoute><MyPost></MyPost></PrivateRoute>
      },
      {
        path : 'adminProfile',
        element : <PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>
      },
      {
        path : 'manageUsers',
        element : <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
      },
      {
        path : 'reportedComments',
        element : <PrivateRoute><ReportedComments></ReportedComments></PrivateRoute>
      },
      {
        path : 'makeAnnouncement',
        element : <PrivateRoute><MakeAnnouncement></MakeAnnouncement></PrivateRoute>
      }
    ]
  }
]);