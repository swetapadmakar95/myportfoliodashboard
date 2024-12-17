import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const RecentActivities = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Completed a milestone",
      description: "Finished the user authentication module for Project Alpha.",
      timestamp: "2 hours ago",
      category: "Completed",
    },
    {
      id: 2,
      title: "Added a new project",
      description: "Started working on a task management tool.",
      timestamp: "1 day ago",
      category: "In Progress",
    },
    {
      id: 3,
      title: "Updated analytics",
      description: "Added progress tracking for weekly tasks.",
      timestamp: "3 days ago",
      category: "In Progress",
    },
  ]);

  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    category: "In Progress",
  });

  const handleAddActivity = () => {
    if (newActivity.title && newActivity.description) {
      const newAct = {
        id: activities.length + 1,
        title: newActivity.title,
        description: newActivity.description,
        timestamp: "Just now",
        category: newActivity.category,
      };
      setActivities([newAct, ...activities]);
      setNewActivity({ title: "", description: "", category: "In Progress" });
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Completed":
        return "fas fa-check-circle text-green-500";
      case "In Progress":
        return "fas fa-sync-alt text-yellow-500";
      case "Upcoming":
        return "fas fa-clock text-blue-500";
      default:
        return "fas fa-question-circle text-gray-500";
    }
  };

  const sortedActivities = activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-semibold mb-4">Recent Activities</h3>

      {/* Add New Activity Form */}
      <div className="mb-6 space-y-2 sm:space-y-4">
        <input
          type="text"
          value={newActivity.title}
          onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
          placeholder="Enter Activity Title"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          value={newActivity.description}
          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
          placeholder="Enter Activity Description"
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="3"
        ></textarea>
        <select
          value={newActivity.category}
          onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Upcoming">Upcoming</option>
        </select>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddActivity}
            className="w-full sm:w-auto py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add New Activity
          </button>
        </div>
      </div>

      {/* Display Activities */}
      <ul className="space-y-4">
        {sortedActivities.map((activity) => (
          <li
            key={activity.id}
            className="flex flex-col sm:flex-row items-start sm:items-center hover:bg-gray-50 p-2 rounded-md transition duration-200"
          >
            <div className="flex-shrink-0 mr-0 sm:mr-4 mb-2 sm:mb-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <i className={`${getCategoryIcon(activity.category)} text-2xl`} />
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-md font-bold">{activity.title}</h4>
              <p className="text-gray-600 text-sm">{activity.description}</p>
              <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
