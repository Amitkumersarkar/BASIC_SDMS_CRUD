import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBook = () => {
    const { _id, name, id, email, photo } = useLoaderData();

    const handleUpdateBook = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedBook = {
            name: form.name.value,
            id: form.id.value,
            email: form.email.value,
            photo: form.photo.value
        };

        const res = await fetch(`http://localhost:3500/books/${_id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedBook)
        });

        const data = await res.json();
        console.log(data);
        if (data.modifiedCount > 0) {
            Swal.fire({
                title: "Book Updated Successfully",
                icon: "success",
                draggable: true
            });
        } else {
            Swal.fire({ title: "No changes made", icon: "info" });
        }
    };

    return (
        <div>
            <form onSubmit={handleUpdateBook}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-7">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Book Name</label>
                        <input type="text" name="name" defaultValue={name} required className="input w-full" placeholder="Enter Book Name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Book Id</label>
                        <input type="number" name="id" defaultValue={id} required className="input w-full" placeholder="Enter Book Id" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Student Email</label>
                        <input type="email" name="email" defaultValue={email} required className="input w-full" placeholder="Enter Your Email" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Books Photo</label>
                        <input type="text" name="photo" defaultValue={photo} required className="input w-full" placeholder="Enter Photo URL" />
                    </fieldset>
                </div>
                <button className="btn btn-secondary w-full">Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBook;