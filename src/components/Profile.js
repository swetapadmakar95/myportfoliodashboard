import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import Avatar from "react-avatar"; // Import Avatar component

const ProfileSection = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const projectsArray = [
    {
      id: 1,
      title: "Project A",
      description: "Description of Project A. It is an e-commerce website you can shop anything you want. It includes all of the things you need to use in your daily life.",
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
      description: "Description of Project B. It is a portfolio page where you can find more information about your projects and their documentation.",
      timeline: "Apr 2022 - Jun 2022",
      status: "In Progress",
      technologies: ["React", "TailwindCSS", "TypeScript"],
      images: [
        "/images/portfolio2.jpeg",
        "/images/portfolio3.jpeg",
        "/images/portfolio4.jpeg",
      ],
    },
    {
      id: 3,
      title: "Project C",
      description: "Description of Project C. It is a blog app where you will find all the information you want to know about your project.",
      timeline: "Jul 2022 - Sep 2022",
      status: "Planned",
      technologies: ["MERN", "TailwindCSS", "JavaScript"],
      images: [
        "/images/blog1.webp",
        "/images/blog2.png",
        "/images/blog3.jpeg",
      ],
    },
  ];

  const project = projectsArray.find((p) => p.id === parseInt(projectId));
  const handlenavigation = (projectId) => navigate(`/project/${projectId}`)

  if (!project) {
    return (
      <div className="p-6 bg-red-100 text-red-800 rounded-lg shadow-md">
        <p className="text-center font-semibold">Project not found!</p>
      </div>
    );
  }

  // Dynamically create the chart data based on the project technologies
  const technologyData = {
    labels: project.technologies,
    datasets: [
      {
        label: "Technologies Used",
        data: project.technologies.map(() => 1),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(project.title, 10, 10);
    doc.text(`Timeline: ${project.timeline}`, 10, 20);
    doc.text(`Status: ${project.status}`, 10, 30);
    doc.text("Technologies: " + project.technologies.join(", "), 10, 40);
    doc.text(project.description, 10, 50);
    doc.save(`${project.title}-details.pdf`);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { author: "Anonymous", date: new Date().toLocaleDateString(), text: newComment }]);
      setNewComment("");
    }
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditedComment(comments[index].text);
  };

  const handleSaveEditedComment = () => {
    if (editedComment.trim()) {
      const updatedComments = [...comments];
      updatedComments[editingCommentIndex].text = editedComment;
      updatedComments[editingCommentIndex].date = new Date().toLocaleDateString();
      setComments(updatedComments);
      setEditingCommentIndex(null);
      setEditedComment("");
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const relatedProjects = projectsArray.filter(
    (p) =>
      p.id !== project.id &&
      p.technologies.some((tech) => project.technologies.includes(tech))
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-400 to-pink-500 text-white py-10 rounded-lg shadow-lg text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-lg mb-4">{project.timeline}</p>
        <p className="text-md font-medium">
          <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
        </p>
        <span
          className={`inline-block px-4 py-2 mt-4 text-sm font-semibold rounded-full ${
            project.status === "Completed"
              ? "bg-green-600"
              : project.status === "In Progress"
              ? "bg-yellow-600"
              : "bg-blue-600"
          }`}
        >
          {project.status}
        </span>
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 mt-4"
        >
          Download PDF
        </button>
      </header>

      {/* Project Overview Section */}

      <section className="bg-white rounded-lg shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
        <p className="text-gray-700 mb-4">
          {isExpanded
            ? project.description
            : `${project.description.substring(0, 100)}...`}
          <button
            className="text-blue-500 underline ml-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </p>
      </section>

      {/* Pie Chart Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Technology Distribution</h2>
        <div className="w-full max-w-md mx-auto">
          <Pie data={technologyData} />
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Related Projects</h2>
        <ul>
          {relatedProjects.map((related) => (
            <li key={related.id} className="mb-2">
              <a onClick={()=>handlenavigation(related?.id)} className="text-blue-500 underline">
                {related.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Image Gallery Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Project Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.images.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={img}
                alt={`Project ${project.title} Image ${index + 1}`}
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Comments Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        <div className="flex">
          <input
            type="text"
            value={editingCommentIndex !== null ? editedComment : newComment}
            onChange={(e) => (editingCommentIndex !== null ? setEditedComment(e.target.value) : setNewComment(e.target.value))}
            placeholder="Write a comment..."
            className="flex-grow border rounded-l px-4 py-2"
          />
          <button
            onClick={editingCommentIndex !== null ? handleSaveEditedComment : handleAddComment}
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            {editingCommentIndex !== null ? "Save" : "Add"}
          </button>
        </div>

        <div className="mb-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded mt-2">
              <div className="flex items-center">
                <Avatar name={comment?.author} size="30" round className="mr-2" />
                <strong>{comment?.author}</strong> -{" "}
                <span className="text-gray-500">{comment?.date}</span>
              </div>
              <p className="ml-9">{comment?.text}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleEditComment(index)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteComment(index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileSection;
