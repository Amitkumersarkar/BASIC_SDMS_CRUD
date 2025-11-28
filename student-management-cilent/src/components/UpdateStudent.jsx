
const UpdateStudent = () => {
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const id = form.id.value;
        const email = form.email.value;
        const photo = form.photo.value;

        const UpdateForm = { name, id, email, photo };
        console.log(UpdateForm);

        // backend update apis


    }
    return (
        <div>
            <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10">
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
                <button className="btn btn-secondary w-full">Update Student</button>
            </form>
        </div>
    );
};

export default UpdateStudent;