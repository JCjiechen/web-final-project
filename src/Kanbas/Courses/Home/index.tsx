import ModuleList from "../Modules/List";
import CourseStatus from "./CourseStatus";

function Home() {
  return (
    <div className="container-fluid d-flex flex-row full-width-div">
      <div className="d-flex flex-row w-100">
        <ModuleList />
        <CourseStatus />
      </div>
    </div>
  );
}
export default Home;
