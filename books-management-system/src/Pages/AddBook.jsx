import Swal from "sweetalert2";

const AddBook = () => {
    const handleAddBook = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const id = form.id.value;
        const email = form.email.value;
        const photo = form.photo.value;

        const newBook = { name, id, email, photo };
        console.log(newBook);
        form.reset();

        // send data to the backend
        fetch("http://localhost:3500/books", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newBook),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Book added!",
                        icon: "success",
                        draggable: true
                    });
                } else {
                    Swal.fire({
                        title: "Failed to add book",
                        icon: "error"
                    });
                }
            });

    }
    return (
        <div>
            <form onSubmit={handleAddBook}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-7">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Book Name</label>
                        <input type="text" name="name" required className="input w-full" placeholder="Enter Book Name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Book Id</label>
                        <input type="number" name="id" required className="input w-full" placeholder="Enter Book Id" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Student Email</label>
                        <input type="email" name="email" required className="input w-full" placeholder="Enter Your Email" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Books Photo</label>
                        <input type="text" name="photo" required className="input w-full" placeholder="Enter Photo URL" />
                    </fieldset>
                </div>
                <button className="btn btn-secondary w-full">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;