import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const BooksCard = ({ book, books, setBooks }) => {
    const { _id, name, id, email, photo } = book;

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // delete 
                fetch(`http://localhost:3500/books/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your book has been deleted.",
                                icon: "success"
                            });

                            // remove deleted book from UI
                            const remainingBooks = books.filter(bookItem => bookItem._id !== _id);
                            setBooks(remainingBooks);
                        }
                    });
            }
        });
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-base-200 border border-base-300 shadow-lg rounded-xl p-5 flex gap-6 items-center">
            <div className="w-32 h-32 rounded-xl overflow-hidden border">
                <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="mt-1">
                    <span className="font-semibold">Books Id:</span> {id}
                </p>
                <p className="mt-1">
                    <span className="font-semibold">Email:</span> {email}
                </p>

                <div className="mt-4 flex gap-3">
                    <Link to={`/book/${_id}`}>
                        <button className="btn btn-info btn-sm">View</button>
                    </Link>

                    <Link to={`/updateBook/${_id}`}>
                        <button className="btn btn-warning btn-sm">Update</button>
                    </Link>

                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn btn-error btn-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BooksCard;
