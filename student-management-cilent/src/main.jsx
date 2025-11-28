import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Root from './Layouts/Root';
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import StudentCard from './components/StudentCard';
import StudentDetails from './components/StudentDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        path: '/',
        Component: Home,
        loader: () => fetch('http://localhost:4500/students')
      },
      {
        path: 'addStudent',
        Component: AddStudent
      },
      {
        path: 'update',
        Component: UpdateStudent
      },
      {
        path: 'studentCard',
        Component: StudentCard
      },
      {
        path: 'student/:id',
        Component: StudentDetails,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
