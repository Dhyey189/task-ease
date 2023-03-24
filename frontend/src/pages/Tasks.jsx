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
  DetailRow
} from "@syncfusion/ej2-react-grids";
import getWithExpiry from "../utils/GetWithExpiry";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import { MdDelete } from "react-icons/md";
import {BsCheckCircle} from "react-icons/bs"
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
          temp_task["scheduled_at"] = task.deadline_at;
          temp_task["current_status"] = task.current_status;
          temp_task_data.push(temp_task);
        });
        setTaskData(temp_task_data);
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log("Soft deleted");
  }

  const handleCompleteTask = (props) => {
    // task-mark-as-completed
    axios.get(`http://127.0.0.1:8000/task/task-mark-as-completed/${user.id}/${props.task_id}/`)
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
          temp_task["scheduled_at"] = task.deadline_at;
          temp_task["current_status"] = task.current_status;
          temp_task_data.push(temp_task);
        });
        setTaskData(temp_task_data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const manageTemplate = (props) => {
    var is_disabled = props.current_status === 'open' ? false : true;
    var delete_button_style = props.current_status === 'open' ? "text-black" : "text-gray-300";
    var done_button_style = props.current_status === 'open' ? "text-black" : (props.current_status === 'accomplished' ? "text-green-500" : "text-gray-400")
    var title_mark = props.current_status === 'open' ? `Mark task '${props.name}' as Completed.` : `Task '${props.name}' is not open.`
    var titla_delete = props.current_status === 'open' ? `Soft Delete task '${props.name}'.` : `Task '${props.name}' is not open.`
    return (
      <div className="flex justify-evenly">
        <button type="button" title={title_mark} onClick={() => handleCompleteTask(props)} className={done_button_style} disabled={is_disabled}><BsCheckCircle className="w-5 h-5"/></button>
        <button type="button" title={titla_delete}  onClick={() => handleSoftDeleteTask(props)} className={delete_button_style} disabled={is_disabled}><MdDelete className="w-6 h-6"/></button>
      </div>
      );
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
          temp_task["scheduled_at"] = task.deadline_at;
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

  const filterOptions = {
    type: 'CheckBox'
  };

  const detailTaskTemplate = (props) => {
    return (
    <>
      <div className="e-card">
          <div className="e-card-header">
            <div className="e-card-header-caption">
              <div className="e-card-header-title"> Description</div>
              <div className="e-card-sub-title">{props.description}</div>
            </div>
            <div className="e-card-header-image football"/>
          </div>
      </div>
      <div className="e-card">
          <div className="e-card-header">
            <div className="e-card-header-caption">
              <div className="e-card-header-title"> Task Type</div>
              <div className="e-card-sub-title">{props.task_type}</div>
            </div>
            <div className="e-card-header-image football"/>
          </div>
      </div>
    </>
    )

  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Your" title="Tasks" />
      {taskData && (
        <GridComponent
          id="gridcomp"
          dataSource={taskData}
          editSettings={editing}
          allowPaging
          allowSorting={true}
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          allowFiltering
          filterSettings={filterOptions}
          detailTemplate={detailTaskTemplate.bind(this)}
          pageSettings={{ pageCount: 5, enableQueryString : true , pageSize : 20}}
          width='auto'
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
            <ColumnDirective
              field="Manage"
              headerText="Manage"
              width="80px"
              template={manageTemplate}
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
              DetailRow,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};
export default Tasks;
