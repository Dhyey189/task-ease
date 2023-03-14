import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import getWithExpiry from "../utils/GetWithExpiry";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import axios from "axios";

const Tasks = () => {
  const editing = { allowDeleting: false, allowEditing: false };
  const user = getWithExpiry("user");
  const [taskData,setTaskData] = useState(null);
  // const [categoryIndex,setCategoryIndex] = useState(null); 
  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:8000/task/categories-list/${user.id}/`)
  //   .then((response) => {
  //       const temp = {}
  //       response.data.map(category => {
  //         temp[`${category.id}`] = category;
  //       })
  //       // setCategoryIndex(temp);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // setCategoryIndex(null);
  //     })
  // })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/task/tasks-list/${user.id}/`)
      .then((response) => {
        console.log(response.data);
        const temp_task_data = [];
        response.data.map(task => {
          let temp_task = {}
          temp_task["name"] = task.name
          temp_task["description"] = task.description
          temp_task["task_type"] = task.task_type
          temp_task["category"] = task.category_obj.name
          temp_task["scheduled_at"] = task.scheduled_at
          temp_task_data.push(temp_task);
        })
        setTaskData(temp_task_data);
      })
      .catch((error) => {
        console.log(error);
        setTaskData(null);
      })
  },[])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Your" title="Tasks" />
      {
         taskData  &&
      <GridComponent
        id="gridcomp"
        dataSource={taskData}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </GridComponent>
      }
    </div>
  );
};
export default Tasks;
