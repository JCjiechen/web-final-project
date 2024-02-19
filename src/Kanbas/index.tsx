import Nav from "../Nav";
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
            className="col-auto d-none d-sm-block"
            style={{ paddingLeft: "inherit" }}
          >
            <KanbasNavigation />
          </div>

          {/* DashBoard */}
          <div className="col col-xs-12">
            <h1>Account</h1>
            <h1>Dashboard</h1>
            <h1>Courses</h1>
          </div>
        </div>
      </div>
    </>
  );
}
export default Kanbas;
