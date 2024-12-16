import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieCharts = () => {
  // Data for "Projects by Status"
  const statusData = {
    labels: ["Completed", "In Progress", "Planned"],
    datasets: [
      {
        label: "Projects by Status",
        data: [60, 30, 10], // Percentages
        backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"], // Green, Yellow, Orange
        borderWidth: 1,
      },
    ],
  };

  // Data for "Technologies Used"
  const techData = {
    labels: ["React", "TailwindCSS", "Node.js", "Others"],
    datasets: [
      {
        label: "Technologies Used",
        data: [40, 30, 20, 10], // Percentages
        backgroundColor: ["#61DAFB", "#38BDF8", "#8CC84B", "#A9A9A9"], // React Blue, Tailwind Blue, Node Green, Gray
        borderWidth: 1,
      },
    ],
  };

  // Data for "Projects by Category"
  const categoryData = {
    labels: ["Frontend", "Backend", "Full-Stack"],
    datasets: [
      {
        label: "Projects by Category",
        data: [50, 25, 25], // Percentages
        backgroundColor: ["#2196F3", "#673AB7", "#FFC107"], // Blue, Purple, Yellow
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Chart 1: Projects by Status */}
      <div className="chart-container">
        <h3 className="text-xl mb-4 text-center">Projects by Status</h3>
        <Pie data={statusData} />
      </div>

      {/* Chart 2: Technologies Used */}
      <div className="chart-container">
        <h3 className="text-xl mb-4 text-center">Technologies Used</h3>
        <Pie data={techData} />
      </div>

      {/* Chart 3: Projects by Category */}
      <div className="chart-container">
        <h3 className="text-xl mb-4 text-center">Projects by Category</h3>
        <Pie data={categoryData} />
      </div>
    </div>
  );
};

export default PieCharts;
