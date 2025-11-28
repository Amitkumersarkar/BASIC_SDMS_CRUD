import { useLoaderData } from "react-router-dom";
import StudentCard from "./StudentCard";

const Home = () => {
    const students = useLoaderData();
    // console.log(students);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            {
                students.map((student) => <StudentCard key={student._id} student={student}></StudentCard>)
            }
        </div>
    );
};

export default Home;