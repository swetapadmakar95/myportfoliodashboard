import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardAnalytics from "./DashboardAnalytics";
import RecentActivities from "./RecentActivities";
import { FaProjectDiagram, FaChartLine, FaTasks, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const recentActivitiesRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleNavigation = (page) => {
    switch (page) {
      case 'project':
        navigate('/projects');
        break;
      case 'analytics':
        navigate('/analytics');
        break;
      case 'taskmanager':
        navigate('/tasks');
        break;
      case 'recentactivities':
        if (recentActivitiesRef.current) {
          recentActivitiesRef.current.scrollIntoView({ behavior: "smooth" });
        }
        break;
      default:
        console.error("Invalid navigation page");
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`p-6 min-h-screen pt-20 pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          className={`p-2 rounded-full ${darkMode ? 'bg-yellow-500' : 'bg-blue-500'}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Step 1: Landing Page */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center" data-testid="dashboardTitle">Portfolio Dashboard</h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome to your portfolio dashboard! Get an overview of your performance metrics, including project progress, technology usage, and time spent on tasks. Navigate easily to explore other sections and manage your projects.
        </p>
        
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg transform cursor-pointer hover:scale-105 transition duration-300 text-center" onClick={() => handleNavigation('project')}>
            <FaProjectDiagram className="text-4xl mb-2 text-blue-500" />
            <h3 className="text-lg font-bold">Explore Projects</h3>
            <p className="text-sm text-gray-600">View detailed information about your projects, filter by category, or search specific projects.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg transform cursor-pointer hover:scale-105 transition duration-300 text-center" onClick={() => handleNavigation('analytics')}>
            <FaChartLine className="text-4xl mb-2 text-green-500" />
            <h3 className="text-lg font-bold">View Analytics</h3>
            <p className="text-sm text-gray-600">Examine interactive charts showcasing project stats, progress, and performance metrics.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg transform cursor-pointer hover:scale-105 transition duration-300 text-center" onClick={() => handleNavigation('taskmanager')}>
            <FaTasks className="text-4xl mb-2 text-orange-500" />
            <h3 className="text-lg font-bold">Manage Tasks</h3>
            <p className="text-sm text-gray-600">Track your daily or weekly tasks, set priorities, and update progress.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg transform cursor-pointer hover:scale-105 transition duration-300 text-center" onClick={() => handleNavigation('recentactivities')}>
            <FaHistory className="text-4xl mb-2 text-purple-500" />
            <h3 className="text-lg font-bold">Recent Activities</h3>
            <p className="text-sm text-gray-600">Stay updated with your recent actions, completed tasks, and updates across your projects.</p>
          </div>
        </div>
      </section>

      {/* Step 2: Explore Projects */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Projects Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold">Total Projects</h3>
            <p className="text-2xl font-bold text-blue-500">10</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold">Active Projects</h3>
            <p className="text-2xl font-bold text-green-500">5</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold">Weekly Progress</h3>
            <p className="text-2xl font-bold text-orange-500">75%</p>
          </div>
        </div>
      </section>

      {/* Step 3: View Analytics */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Analytics</h2>
        <DashboardAnalytics />
      </section>

      {/* Step 4: Recent Activities */}
      <section className="mb-8" ref={recentActivitiesRef}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Recent Activities</h2>
        <RecentActivities />
      </section>
    </div>
  );
};

export default Dashboard;
