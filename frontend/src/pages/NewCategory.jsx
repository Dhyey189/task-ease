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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const NewCategory = () => {
    const { currentMode,currentColor } = useStateContext();
    const [categories, setCategories] = useState();
    const user = getWithExipry("user");
    const navigate = useNavigate();
    const [categoryname,setCategoryName] = useState(null);
    const [categorydescription,setCategoryDescription] = useState(null);
    const [alert, setAlert] = useState(false)
    const [errmessage, setErrorMessage] = useState(null);
    function createCategory(){
        var message = ""
        if(!categoryname) {
          setAlert(true)
          setErrorMessage("Category title is required!")
          return;
        } 
        setAlert(false)
        setErrorMessage(null)

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
          <div className="m-10">
            {
            alert && errmessage &&
            (<Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <span style={{"whiteSpace" : "pre-line"}}>{errmessage}</span>
                    
            </Alert>)
            }
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