import { useLoaderData } from "react-router-dom";
import BooksCard from "../Pages/BooksCard";
import { useState } from "react";

const Home = () => {
    const booksData = useLoaderData();
    const [books, setBooks] = useState(booksData);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {books.map((book) => (
                <BooksCard
                    key={book._id}
                    book={book}
                    books={books}
                    setBooks={setBooks}
                />
            ))}
        </div>
    );
};

export default Home;
