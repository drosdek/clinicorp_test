import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";

function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    );
}

export default Routers;