import Swal from "sweetalert2";

const AddStudent = () => {
    const handleAdd = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const id = form.id.value;
        const email = form.email.value;
        const photo = form.photo.value;

        const newStudent = { name, id, email, photo };
        console.log(newStudent);

        form.reset();
        // connect with server
        fetch('http://localhost:4500/students', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log(data)
                    // alert
                    Swal.fire({
                        title: "Student Added Successfully",
                        icon: "success",
                        draggable: true
                    });
                }
            })

    }
    return (
        <div>
            <form onSubmit={handleAdd}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-7">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Student Name</label>
                        <input type="text" name="name" required className="input w-full" placeholder="Enter Your Name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Student Id</label>
                        <input type="number" name="id" required className="input w-full" placeholder="Enter Your Id" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Student Email</label>
                        <input type="email" name="email" required className="input w-full" placeholder="Enter Your Email" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Student Photo</label>
                        <input type="photo" name="photo" required className="input w-full" placeholder="Enter Your Name" />
                    </fieldset>
                </div>
                <button className="btn btn-secondary w-full">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;