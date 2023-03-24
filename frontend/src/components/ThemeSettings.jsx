import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { themeColors } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import getWithExpiry from "../utils/GetWithExpiry";

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } =
    useStateContext();
  const user = getWithExpiry("user");
  const [goal, setGoal] = useState(null);
  const [taskDoneToday, setTaskDoneToday] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/task/get-user-goal/${user.id}/`)
      .then((response) => {
        console.log(response.data);
        setGoal(response.data.tasks_todo);
        setTaskDoneToday(response.data.tasks_done);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const changeGoal = (newGoalValue) => {
    axios
      .post(
        `http://127.0.0.1:8000/task/set-user-goal/${user.id}/${newGoalValue}/`
      )
      .then((response) => {
        console.log(response.data);
        setGoal(response.data.tasks_todo);
        setTaskDoneToday(response.data.tasks_done);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        {goal && (
          <div className="flex-col border-t-1 border-color p-4 ml-4">
              <p className="font-semibold text-xl ">Daily Goal. ({taskDoneToday}/{goal} task completed)</p>

            <div className="mt-4 dark:text-white">
              <NumericTextBoxComponent
                format="n3"
                decimals={0}
                value={goal}
                min={3}
                validateDecimalOnType={true}
                change={(e) => {
                  changeGoal(e.value);
                }}
              />
            </div>
          </div>
        )}
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Theme Option</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={setMode}
              className="cursor-pointer"
              checked={currentMode === "Dark"}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>
        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl ">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <TooltipComponent
                key={index}
                content={item.name}
                position="TopCenter"
              >
                <div
                  className="relative mt-2 cursor-pointer flex gap-5 items-center"
                  key={item.name}
                >
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setColor(item.color)}
                  >
                    <BsCheck
                      className={`ml-2 text-2xl text-white ${
                        item.color === currentColor ? "block" : "hidden"
                      }`}
                    />
                  </button>
                </div>
              </TooltipComponent>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
