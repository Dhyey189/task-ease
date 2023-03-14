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

const NewCategory = () => {
    const { currentMode,currentColor } = useStateContext();
    const [categories, setCategories] = useState();
    const user = getWithExipry("user");
    const navigate = useNavigate();
    const [categoryname,setCategoryName] = useState("");
    const [categorydescription,setCategoryDescription] = useState("");

    function createCategory(){
        const category = {
            "name" : categoryname,
            "description" : categorydescription,
            "user" : user.id
        }
        axios.post("http://127.0.0.1:8000/task/category/",category)
            .then((response) => {
                console.log(response.data)
                navigate('/app')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="flex-col flex items-center dark:text-white text-2xl">
          <div className="w-3/6 ">
            <div className="">
              <b>New Category</b>
            </div>
          </div>
          <div className="w-3/6 mt-6 pb-4">
            <div className="">
              <TextBoxComponent placeholder="Title" change={(e) => setCategoryName(e.value)} floatLabelType="Auto" />
            </div>
          </div>
          <div className="w-3/6 mt-6 pb-4">
            <div className="">
              <TextBoxComponent
                multiline={true}
                floatLabelType="Auto"
                placeholder="Description"
                change={(e) => setCategoryDescription(e.value)}
              ></TextBoxComponent>
            </div>
          </div>
          <div>
          <Button
              color="white"
              bgColor={currentColor}
              handleFunction = {createCategory}
              text="Create a Category"
              borderRadius="10px"
              width="full"
            />
          </div>
        </div>
      );
    
}

export default NewCategory