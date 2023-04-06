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
  const [taskScheduledAt,setTaskScheduledAt] = useState(null);
  let validationClass = {
    "title" : "e-success",
    "description" : "e-success",
    "category" : "e-success",
    "task-type" : "e-success"
  }
  const [isValid, setIsValid ] = useState(false);
  const currentDate = new Date()
  
  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/task/categories-list/${user.id}/`)
      .then((response) => {
        console.log(response.data);
        
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const createTask = () => {
    if (!validated()) {
      console.log("Validation error");
      return;
    }
    console.log(taskScheduledAt.toString())
    const task = {
      "name" : taskname,
      "description" : taskdescription,
      "category" : taskcategory,
      "task_type" : tasktype,
      "scheduled_at" : taskScheduledAt.toString(),
      "user" : user.id,
    }
    axios
      .post(`http://127.0.0.1:8000/task/task/`,task)
      .then((response) => {
        console.log(response.data);
        navigate('/app/tasks')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const validated = () => {
    var cnt = 0;
    if (taskname) {
      validationClass["title"] = "e-success"
      cnt++;
    }
    else{
      validationClass["title"] = "e-error"
    }
    if (taskdescription) {
      validationClass["description"] = "e-success"
      cnt++;
    }
    else{
      validationClass["description"] = "e-error"
    }
    if (taskcategory) {
      validationClass["category"] = "e-success"
      cnt++;
    }
    else{
      validationClass["category"] = "e-error"
    }
    if (tasktype) {
      validationClass["task-type"] = "e-success"
      cnt++;
    }
    else{
      validationClass["task-type"] = "e-error"
    }
    return cnt>=4;
  }

  return (
    <div className="flex-col flex items-center text-white text-2xl">
      <div className="w-3/6 ">
        <div className="">
          <b>New Task</b>
        </div>
      </div>
      <div className="w-3/6 mt-6 pb-4">
        <div className="">
          <TextBoxComponent placeholder="Title" cssClass={validationClass["title"]} change={(e) => {
            validated();
            setTaskName(e.value);
            }} 
            floatLabelType="Auto" />
        </div>
      </div>
      <div className="w-3/6 mt-6 pb-4">
        <div className="">
          <TextBoxComponent
            multiline={true}
            floatLabelType="Auto"
            placeholder="Description"
            change={(e) => {
              validated();
              setTaskDescription(e.value);
            }}
            cssClass={validationClass["description"]}
          ></TextBoxComponent>
        </div>
      </div>
      <div className="w-3/6 mt-6 pb-4 flex justify-between">
        <div className="w-5/12">
          {categories && (
            <DropDownListComponent
              id="name"
              fields={{ text: "name", value: "id" }}
              change={(e) => {
                validated();
                setTaskCategory(e.value)
              }}
              style={{
                border: "none",
                color: currentMode === "Dark" && "white",
                
              }}
              cssClass={validationClass["category"]}
              dataSource={categories}
              placeholder="category"
              popupHeight="220px"
            />
          )}
        </div>
        <div className="w-5/12">
          {categories && (
            <DropDownListComponent
              id="name"
              fields={{ text: "type", value: "id" }}
              change={(e) => {
                validated();
                setTaskType(e.value);
              }}
              style={{
                color: currentMode === "Dark" && "white",
              }}
              dataSource={task_type}
              cssClass={`${validationClass["task-type"]} border-2`}
              placeholder="task type"
              popupHeight="220px"
            />
          )}
        </div>
      </div>
      <div className="w-3/6 mt-6 pb-4 flex justify-evenly">
        <p className="p-2 text-2xl text-gray-600">Scheduled at:</p>
        <div>
        <DateTimePickerComponent 
        placeholder="Select a date & time" 
        change={(e) => {
          validated();
          setTaskScheduledAt(e.value);
        }}
        min={currentDate}
        ></DateTimePickerComponent>
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
