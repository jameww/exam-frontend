import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="header-bar">
        <ul>
          <li>
            <NavLink
              to={`/`}
              className={(navData) => (navData.isActive ? "focus-nav" : "")}
            >
              <div>
                <span className="link-name">Pokemon List</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/examdata`}
              className={(navData) => (navData.isActive ? "focus-nav" : "")}
            >
              <div>
                <span className="link-name">Exam Data</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
