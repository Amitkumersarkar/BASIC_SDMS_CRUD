import { useLoaderData } from "react-router-dom";
import StudentCard from "./StudentCard";
import { useState } from "react";

const Home = () => {

    const students = useLoaderData();

    // use this state for UI updates
    const [std, setStd] = useState(students);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            {
                std.map((student) => (
                    <StudentCard
                        key={student._id}
                        student={student}
                        std={std}
                        setStd={setStd}
                    />
                ))
            }
        </div>
    );
};

export default Home;
