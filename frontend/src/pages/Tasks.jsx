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
import { MdDelete } from "react-icons/md";
import axios from "axios";


const Tasks = () => {
  const editing = { allowDeleting: false, allowEditing: false };
  const user = getWithExpiry("user");
  const [taskData, setTaskData] = useState(null);
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  
  const handleSoftDeleteTask = (props) => {
    console.log(props.task_id)
    axios.get(`http://127.0.0.1:8000/task/task-soft-delete/${user.id}/${props.task_id}/`)
      .then((response) => {
        console.log(response.data)
        const temp_task_data = [];
        response.data.map((task) => {
          let temp_task = {};
          temp_task["task_id"] = task.id
          temp_task["name"] = task.name;
          temp_task["description"] = task.description;
          temp_task["task_type"] = task.task_type;
          temp_task["category"] = task.category_obj.name;
          temp_task["scheduled_at"] = task.scheduled_at;
          temp_task["current_status"] = task.current_status;
          temp_task["Delete"] = <MdDelete className="w-5 h-5"/>;
          temp_task_data.push(temp_task);
        });
        setTaskData(temp_task_data);
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log("Soft deleted");
  }

  const deleteTemplate = (props) => {
    var is_disabled = props.current_status === 'open' ? false : true;
    var button_style = props.current_status === 'open' ? "text-black" : "text-gray-300";
    return <button type="button" onClick={() => handleSoftDeleteTask(props)} className={button_style} disabled={is_disabled}>{props.Delete}</button>;
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/task/tasks-list/${user.id}/`)
      .then((response) => {
        console.log(response.data);
        const temp_task_data = [];
        response.data.map((task) => {
          let temp_task = {};
          temp_task["task_id"] = task.id
          temp_task["name"] = task.name;
          temp_task["description"] = task.description;
          temp_task["task_type"] = task.task_type;
          temp_task["category"] = task.category_obj.name;
          temp_task["scheduled_at"] = task.scheduled_at;
          temp_task["current_status"] = task.current_status;
          temp_task["Delete"] = <MdDelete className="w-5 h-5"/>;
          temp_task_data.push(temp_task);
        });
        setTaskData(temp_task_data);
      })
      .catch((error) => {
        console.log(error);
        setTaskData(null);
      });
  }, []);

  // const rowSelected = (e) => {
  //   console.log("In row selected");
  //   setCurrentRowIndex(e.row.getAttribute("aria-rowindex"));
  // };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Your" title="Tasks" />
      {taskData && (
        <GridComponent
          id="gridcomp"
          dataSource={taskData}
          editSettings={editing}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
            <ColumnDirective
              field="Delete"
              headerText="Delete"
              width="80px"
              template={deleteTemplate}
              textAlign="Center"
            />
          </ColumnsDirective>
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Edit,
              PdfExport,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};
export default Tasks;
