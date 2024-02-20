import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "../Nav";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";

function Kanbas() {
  return (
    <>
      <Nav />
      <br />
      <div className="container-fluid h-100 w-100">
        <div className="row h-100">
          {/* Kanbas Navigation  */}
          <div
            className="col-auto d-none d-md-block"
            style={{ paddingLeft: "inherit" }}
          >
            <KanbasNavigation />
          </div>

          {/* Routes */}
          <div className="col col-xs-12">
            <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="Account" element={<h1>Account</h1>} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Courses/:courseId/*" element={<Courses />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
export default Kanbas;
