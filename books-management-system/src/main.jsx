import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Root from './Layouts/Root';
import Home from './Components/Home';
import AddBook from './Pages/AddBook';
import UpdateBook from './Pages/UpdateBook';
import BooksDetails from './Pages/BooksDetails';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch('http://localhost:3500/books')
      },
      {
        path: '/addBook',
        Component: AddBook
      },
      {

        path: 'updateBook/:id',
        Component: UpdateBook,
        loader: ({ params }) =>
          fetch(`http://localhost:3500/books/${params.id}`)
            .then(res => res.json())
      },
      {
        path: '/booksDetails',
        Component: BooksDetails
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
