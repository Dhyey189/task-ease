import react, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {Button} from "../components/"
import "../styles/MainApp.css";
import axios from "axios";
import getWithExipry from "../utils/GetWithExpiry";
import { useStateContext } from "../contexts/ContextProvider";

const NewTask = () => {
  const { currentMode,currentColor } = useStateContext();
  const [categories, setCategories] = useState();
  const user = getWithExipry("user");
  const navigate = useNavigate();
  const task_type = [
    {
      "type" : "Onetime",
      "id" : "onetime"
    },
    {
      "type" : "Recurring",
      "id" : "recurring"
    }
  ]
  const [taskname,setTaskName] = useState(null);
  const [taskdescription,setTaskDescription] = useState(null);
  const [taskcategory,setTaskCategory] = useState(null);
  const [tasktype,setTaskType] = useState(null);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/task/category/${user.id}/`)
      .then((response) => {
        console.log(response.data);

        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const createTask = () => {
    const task = {
      "name" : taskname,
      "description" : taskdescription,
      "category" : taskcategory,
      "task_type" : tasktype,
      "user" : user.id,
    }
    axios
      .post(`http://127.0.0.1:8000/task/`,task)
      .then((response) => {
        console.log(response.data);
        navigate('/app/')
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="flex-col flex items-center dark:text-white text-2xl">
      <div className="w-3/6 ">
        <div className="">
          <b>New Task</b>
        </div>
      </div>
      <div className="w-3/6 mt-6 pb-4">
        <div className="">
          <TextBoxComponent placeholder="Title" change={(e) => setTaskName(e.value)} floatLabelType="Auto" />
        </div>
      </div>
      <div className="w-3/6 mt-6 pb-4">
        <div className="">
          <TextBoxComponent
            multiline={true}
            floatLabelType="Auto"
            placeholder="Description"
            change={(e) => setTaskDescription(e.value)}
          ></TextBoxComponent>
        </div>
      </div>
      <div className="w-3/6 mt-6 pb-4 flex justify-between">
        <div className="w-5/12">
          {categories && (
            <DropDownListComponent
              id="name"
              fields={{ text: "name", value: "id" }}
              change={(e) => setTaskCategory(e.value)}
              style={{
                border: "none",
                color: currentMode === "Dark" && "white",
                
              }}
              dataSource={categories}
              placeholder="Choose a category"
              popupHeight="220px"
            />
          )}
        </div>
        <div className="w-5/12">
          {categories && (
            <DropDownListComponent
              id="name"
              fields={{ text: "type", value: "id" }}
              change={(e) => setTaskType(e.value)}
              style={{
                border: "none",
                color: currentMode === "Dark" && "white",
              }}
              dataSource={task_type}
              placeholder="Choose type of task"
              popupHeight="220px"
            />
          )}
        </div>
      </div>
      <div className="w-3/6 mt-6 pb-4 flex justify-evenly">
        <p className="p-2 text-2xl text-gray-600">Scheduled at:</p>
        <div>
        <DateTimePickerComponent placeholder="Select a date & time"></DateTimePickerComponent>
        </div>
      </div>
      <div>
      <Button
          color="white"
          bgColor={currentColor}
          handleFunction = {createTask}
          text="Create a task"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default NewTask;
