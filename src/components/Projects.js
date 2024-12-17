import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const projectref = useRef(null);

  // Wrap `initialProjectsArray` in useMemo
  const initialProjectsArray = useMemo(
    () => [
      {
        id: 1,
        title: "Project A",
        description:
          "Description of Project A. It is a detailed explanation of the project objectives, scope, and implementation.",
        timeline: "Jan 2022 - Mar 2022",
        status: "Completed",
        technologies: ["React", "TailwindCSS", "Chart.js"],
        images: [
          "/images/website1.jpg",
          "/images/website2.jpeg",
          "/images/website3.jpeg",
        ],
      },
      {
        id: 2,
        title: "Project B",
        description: "Description of Project B",
        timeline: "Apr 2022 - Jun 2022",
        status: "In Progress",
        technologies: "React, TailwindCSS, TypeScript",
      },
      {
        id: 3,
        title: "Project C",
        description: "Description of Project C",
        timeline: "Jul 2022 - Sep 2022",
        status: "Planned",
        technologies: "MERN, TailwindCSS, JavaScript",
      },
    ],
    []
  );

  const [projects, setProjects] = useState(initialProjectsArray);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    timeline: "",
    status: "Completed",
    technologies: "",
  });

  const applyFilters = React.useCallback(() => {
    let filteredProjects = initialProjectsArray;

    if (searchText) {
      filteredProjects = filteredProjects.filter((project) =>
        project.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filter !== "All") {
      filteredProjects = filteredProjects.filter(
        (project) => project.status === filter
      );
    }

    setProjects(filteredProjects);
  }, [searchText, filter, initialProjectsArray]);

  React.useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearchChange = (event) => setSearchText(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleProjectClick = (projectId) => navigate(`/project/${projectId}`);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingProject) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editingProject
            ? { ...newProject, id: editingProject }
            : project
        )
      );
      setEditingProject(null);
      projectref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      const newProjectWithId = {
        ...newProject,
        id: Math.max(...projects.map((p) => p.id)) + 1,
      };
      setProjects((prevProjects) => [...prevProjects, newProjectWithId]);
    }
    setNewProject({
      title: "",
      description: "",
      timeline: "",
      status: "Completed",
      technologies: "",
    });
  };

  const handleDelete = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  const handleEdit = (projectId) => {
    const projectToEdit = projects.find((project) => project.id === projectId);
    setNewProject(projectToEdit);
    setEditingProject(projectId);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen pt-20 py-20">
      {/* Add/Edit Project Form */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-8" ref={formRef}>
        <h3 className="text-2xl font-semibold mb-4">
          {editingProject ? "Edit Project" : "Add Project"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newProject.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="timeline"
              placeholder="Project Timeline"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newProject.timeline}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Project Description"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newProject.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="technologies"
              placeholder="Technologies"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newProject.technologies}
              onChange={handleInputChange}
              required
            />
            <select
              name="status"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newProject.status}
              onChange={handleInputChange}
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Planned">Planned</option>
            </select>
          </div>
          <div className="flex justify-end mb-6">
            <button
              type="submit"
              className="mt-6 w-full sm:w-auto px-6 py-3 justify-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingProject ? "Update Project" : "Add Project"}
            </button>
          </div>
        </form>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold mb-4 sm:mb-0">All Projects</h2>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search Project"
            className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchText}
            onChange={handleSearchChange}
          />
          <select
            className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={projectref}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div
                className="text-xl font-semibold cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                {project.title}
              </div>
              <p className="text-gray-700 mt-2">{project.description}</p>
              <p className="text-gray-500">{project.timeline}</p>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
                  project.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : project.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {project.status}
              </span>
              <p className="text-gray-500 mt-2">{project.technologies}</p>
              <div className="flex mt-4 gap-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEdit(project.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
