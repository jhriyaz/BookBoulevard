import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/Layout/MainLayout";
import Home from "../pages/Home/Home";
import Signin from "../pages/auth/signin/SignIn";
import SignUp from "../pages/auth/signup/SignUp";
import PublicRoute from "./routecontrol/PublicRoute";
import Borrowed from "../pages/Books/Borrowed/Borrowed";
import PrivateRoute from "./routecontrol/PrivateRoute";
import Addbook from "../pages/Books/Addbook";
import AllBooks from "../pages/Books/allbooks/AllBooks";
import Category from "../pages/category/Category";
import SingleBook from "../pages/Books/SingleBook";
import UpdateBook from "../pages/Books/UpdateBook";
import ReadBook from "../pages/Books/ReadBook";
import Error from "../pages/Error/Error";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<Error></Error>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            {" "}
            <Addbook></Addbook>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-book",
        loader: () => fetch(`${import.meta.env.VITE_URL}/booksnumber`),
        element: (
          <PrivateRoute>
            <AllBooks></AllBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <PublicRoute>
            <Signin></Signin>
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <SignUp></SignUp>
          </PublicRoute>
        ),
      },
      {
        path: "/borrowed-book",
        element: (
          <PrivateRoute>
            <Borrowed></Borrowed>
          </PrivateRoute>
        ),
      },
      { path: "/categories/:category", element:<PrivateRoute> <Category></Category> </PrivateRoute>},
      {
        path: "/books/:id",
        element: (
          <PrivateRoute>
            <SingleBook></SingleBook>
          </PrivateRoute>
        ),
      },
      {
        path: `/book/update/:id`,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/book/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
      },
      { path: `/books/read/:id` ,element:
      <PrivateRoute>
<ReadBook></ReadBook>
      </PrivateRoute>},
    ],
  },
 
]);

export default Routes;
