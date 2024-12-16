import React, { useState } from "react";
import {
  ArchiveBoxXMarkIcon,
  CheckIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import EditPopup from "./EditTaskPoup";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import moment from "moment";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [searchTerm, setSearchTerm] = useState("");
  const [openEditPanel, setOpenEditPanel] = useState(false);
  const [editTaskItemId, setEditTaskItemId] = useState("");
  const [count, setCount] = useState(0);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: count + 1,
      name: taskInput,
      description: "",
      priority,
      project: '',
      completed: false,
      StartDate: moment(new Date()).format("DD/MM/YYYY"),
      EndDate: moment(new Date()).format("DD/MM/YYYY"),
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
    setPriority("Normal");
    setCount((prev) => prev + 1);
  };
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editItem = (id) => {
    setEditTaskItemId(id);
    setOpenEditPanel(true);
  };

  const closePopup = () => {
    setOpenEditPanel(false);
    setEditTaskItemId("");
  };

  // Filter tasks based on search term and selected project
  const filteredTasks = tasks.filter(
    (task) =>
      (task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.project.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
    { field: "name", headerName: "Name", width: 200, sortable: true },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div dangerouslySetInnerHTML={{ __html: params.row.description }} />
      ),
    },
    { field: "priority", headerName: "Priority", width: 150, sortable: true },
    { field: "project", headerName: "Project", width: 150, sortable: true },
    {
      field: "completed",
      headerName: "Is Completed",
      width: 150,
      sortable: true,
      renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
    },
    { field: "StartDate", headerName: "Start Date", width: 160, sortable: true },
    { field: "EndDate", headerName: "End Date", width: 160, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          {!params.row.completed && (
            <IconButton
              aria-label="toggle-completion"
              onClick={() => toggleCompletion(params.row.id)}
            >
              <CheckIcon className="size-6 text-green-600" />
            </IconButton>
          )}
          <IconButton aria-label="edit" onClick={() => editItem(params.row.id)}>
            <PencilSquareIcon className="size-6 text-gray-600" />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deleteTask(params.row.id)}
          >
            <ArchiveBoxXMarkIcon className="size-6 text-gray-600" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md pt-20 pb-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
        <p className="text-gray-600 text-center mb-6">
          Manage your daily or weekly tasks efficiently. Associate tasks with
          projects, mark them as completed, or delete them to stay organized and
          productive.
        </p>
        {/* Add Task Section */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 my-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Task Table */}
        <DataGrid
          rows={filteredTasks}
          columns={columns}
          disableColumnMenu={false}
          disableColumnReorder={false}
          disableSelectionOnClick
          autoHeight
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          sx={{
            "& .MuiDataGrid-cell": {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "lightgray",
            },
          }}
        />
      </div>

      {openEditPanel && (
        <EditPopup
          task={tasks.find((task) => task.id === editTaskItemId)}
          closePopup={closePopup}
          updateTask={(updatedTask) =>
            setTasks(
              tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
            )
          }
        />
      )}
    </>
  );
};

export default TaskManager;
