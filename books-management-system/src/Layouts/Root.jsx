import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Root = () => {

    return (
        <div className="max-w-7xl mx-auto my-5">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;