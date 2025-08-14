import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Admin from "./Admin/Admin";
import About from "./About";
import EmployeeManage from "./Admin/EmployeeManage";
import AddEmployee from "./Admin/AddEmployee";
import EditEmployee from "./Admin/EditEmployee";
import AdminBookings from "./Admin/AdminBooking";
import Review from "./Review";
import RoomManagement from "./Admin/RoomManagement";
import RoomBooking from "./RoomBooking";
import BookingConfirmation from "./BookingConfirmation";

function App() {

  const isLoggedIn = localStorage.getItem('jwtToken') ? true : false;
  const isAdmin = localStorage.getItem('Admintoken') ? true : false;

  const wrapPrivateRoute = (element, user, redirect, toktype) => {
    return (
      <PrivateRoute user={user} redirect={redirect} toktype={toktype}>
        {element}
      </PrivateRoute>
    );
  };

  const router = createBrowserRouter([
    {
      path: "*",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/auth/login", element: <Login />,
    },
    {
      path: "/auth/register", element: <Register />,
    },
    {
      path: "/review",
      element: wrapPrivateRoute(<Review />, isLoggedIn, '/auth/login', 'jwtToken'),
    },
    {
      path: '/confirmation',
      element: wrapPrivateRoute(<BookingConfirmation />, isLoggedIn, '/auth/login', 'jwtToken'),
    }
    , {
      path: "/admin/*", element: wrapPrivateRoute(<Admin />, isAdmin, '/admin', 'AdminToken'),

    }
    , {
      path: "/admin/employeemanage", element: wrapPrivateRoute(<EmployeeManage />, isAdmin, '/admin', 'AdminToken'),
    }
    , {
      path: "/admin/add-employee", element: wrapPrivateRoute(<AddEmployee />, isAdmin, '/admin', 'AdminToken'),
    }
    , {
      path: "/admin/bookings", element: wrapPrivateRoute(<AdminBookings />, isAdmin, '/admin', 'AdminToken'),
    }
    , {
      path: "/admin/edit-employee/:username", element: wrapPrivateRoute(<EditEmployee />, isAdmin, '/admin', 'AdminToken'),
    },
    { path: '/admin/rooms', element: wrapPrivateRoute(<RoomManagement />, isAdmin, '/auth/login', 'AdminToken') },
    { path: '/booking', element: wrapPrivateRoute(<RoomBooking />, isLoggedIn, '/auth/login', 'jwtToken') }
  ]);

  return (
    <>
      {
        console.log('jwtToken : ' + localStorage.getItem('jwtToken'))}
      {
        console.log('AdminToken : ' + localStorage.getItem('AdminToken'))

      }
      <RouterProvider router={router} />
    </>
  )
}

export default App
