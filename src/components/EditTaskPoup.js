import React, { useState } from "react";
import moment from "moment";
import MyEditor from "./HtmlEditor";
import { EditorState, ContentState } from "draft-js";
import { PencilIcon } from "@heroicons/react/24/solid";

const EditPopup = ({ task, closePopup, updateTask }) => {
  const [editedName, setEditedName] = useState(task.name);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [startdate, setStartDate] = useState(
    moment(task.StartDate, "DD/MM/YYYY").format("YYYY-MM-DD")
  );
  const [enddate, setEndDate] = useState(
    moment(task.EndDate, "DD/MM/YYYY").format("YYYY-MM-DD")
  );
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [selectedProject, setSelectedProject] = useState(task.project || "General");
  const [isProjectPopupOpen, setIsProjectPopupOpen] = useState(false);
  const projectsArray = [
    {
      id: 1,
      title: "Project A",
      description: "Description of Project A",
      timeline: "Jan 2022 - Mar 2022",
      status: "Completed",
      technologies: "React, TailwindCSS, Chart.js",
      role: "Frontend Developer",
    },
    {
      id: 2,
      title: "Project B",
      description: "Description of Project B",
      timeline: "Apr 2022 - Jun 2022",
      status: "In Progress",
      technologies: "React, TailwindCSS, TypeScript",
      role: "Frontend Developer",
    },
    {
      id: 3,
      title: "Project C",
      description: "Description of Project C",
      timeline: "Jul 2022 - Sep 2022",
      status: "Planned",
      technologies: "MERN, TailwindCSS, JavaScript",
      role: "Frontend Developer",
    },
  ];
  const [editorState, setEditorState] = useState(() => {
    const description = task.description || "";
    return description
      ? EditorState.createWithContent(ContentState.createFromText(description))
      : EditorState.createEmpty();
  });

  const handleSave = () => {
    const rawContent = editorState.getCurrentContent().getPlainText();
    updateTask({
      ...task,
      name: editedName,
      priority: editedPriority,
      StartDate: moment(startdate).format("DD/MM/YYYY"),
      EndDate: moment(enddate).format("DD/MM/YYYY"),
      completed: isCompleted,
      project: selectedProject,
      description: rawContent,
    });
    closePopup();
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project.title);
    setIsProjectPopupOpen(false);
  };

  return (
    <div className="fixed top-0 right-0 w-full sm:w-4/12 md:w-2/6 h-full bg-white shadow-lg border-l border-gray-300 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b z-10">
        <h2 className="text-lg font-semibold text-gray-800">{editedName}</h2>
        <button
          onClick={closePopup}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 max-h-[calc(100vh-160px)] overflow-y-auto">
        {/* Title and Completion */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Completed</label>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="h-5 w-5 accent-blue-500"
            />
          </div>
        </div>

        {/* Priority, Start Date, End Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Priority</label>
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={enddate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Project Selector */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-1">Project</label>
          <div className="flex items-center">
            <input
              type="text"
              value={selectedProject}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 focus:ring focus:ring-blue-200"
            />
            <PencilIcon className="size-4 absolute right-2 text-gray-600" onClick={() => setIsProjectPopupOpen(true)} />
          </div>
        </div>

        {/* Description Editor */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Description</label>
          <MyEditor editorState={editorState} setEditorState={setEditorState} />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full sm:w-4/12 p-4 border-t border-gray-300 fixed bottom-0 right-0 z-10">
        <div className="flex justify-end gap-2">
          <button
            onClick={closePopup}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* Project Selection Popup */}
      {isProjectPopupOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-4/12 md:w-3/12 h-full bg-white shadow-lg border-l border-gray-300 z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Select a Project</h3>
            <button
              onClick={() => setIsProjectPopupOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-6 overflow-y-auto h-[calc(100vh-160px)]">
            <ul className="space-y-2">
              {projectsArray.map((project, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleProjectSelect(project)}
                >
                  {project.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPopup;
