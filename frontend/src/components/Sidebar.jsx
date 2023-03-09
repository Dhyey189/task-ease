import React, {useEffect, useState} from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import getWithExipry from "../utils/GetWithExpiry"
import { links} from "../data/dummy"
import axios from "axios";
import {FaPlus,FaTasks} from "react-icons/fa"
import {HiOfficeBuilding,HiHome} from "react-icons/hi"
import {BiCategory} from "react-icons/bi";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const user = getWithExipry("user");
  const [categories,setCategories] = useState();
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/task/category/${user.id}/`)
    .then((response) => {
        console.log(response.data);
        response.data[0].icon = <HiOfficeBuilding/>
        response.data[1].icon = <HiHome/>
        response.data[5].icon = <BiCategory/>
        setCategories(response.data);

    })
    .catch((error) => { 
        console.log(error);
    });
  },[])

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>TaskEase</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
          <div key="Categories">
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Categories
                </p>
                {categories && categories.map((category) => (
                  <NavLink
                    to={`/app/category/${category.name}`}
                    key={category.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <i className="text-xl">{category.icon}</i>
                    <span className="capitalize ">{category.name}</span>
                  </NavLink>
                ))}
                <NavLink
                    to={`/app/new-category/`}
                    key="new-category"
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <FaPlus/>
                    <span className="capitalize ">Add New Category</span>
                  </NavLink>
            </div>  
            <div key="Tasks">
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Tasks
                </p>
                  <NavLink
                    to={`/app/tasks`}
                    key="tasks"
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <FaTasks/>
                    <span className="capitalize ">Tasks</span>
                  </NavLink>
                  <NavLink
                    to={`/app/new-task`}
                    key="new-task"
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <FaPlus/>
                    <span className="capitalize ">Add New Task</span>
                  </NavLink>
            </div>  
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/app/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
