import React, { useState } from "react";
import "../styles/Sidebar.css";
import { FaBars } from "react-icons/fa";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const SideNavbar = ({sidebarvalue}) => {
  const [sidebar, setSidebar] = useState(sidebarvalue);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      {sidebar ? (
        <div className="sidebar">
          <ul>
            <li>
              <button onClick={toggleSidebar}>
                <FaBars />
              </button>
            </li>
            <li>
              <Link to="#" className="field">
                Inbox
              </Link>
            </li>
            <li>
              <Link to="#" className="field">
                Tasks
              </Link>
            </li>
            <li>
              <Link to="#" className="field">
                Category
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default SideNavbar;
