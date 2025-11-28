import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const StudentCard = ({ student }) => {
    const { _id, name, photo, id, email } = student;

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result.isConfirmed);
            if (result.isConfirmed) {

                // delete apis
                fetch(`http://localhost:4500/students/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })
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
                <p className="mt-1"><span className="font-semibold">ID:</span> {id}</p>
                <p className="mt-1"><span className="font-semibold">Email:</span> {email}</p>

                <div className="mt-4 flex gap-3">
                    <Link to={`/student/${_id}`}>
                        <button className="btn btn-info btn-sm">View</button>
                    </Link>

                    <Link to={`/update/${_id}`}>
                        <button className="btn btn-warning btn-sm">Update</button>
                    </Link>
                    <button onClick={() => handleDelete(_id)} className="btn btn-error btn-sm">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default StudentCard;
