import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { saveAs } from "file-saver";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AnalyticsSection = () => {
  const [dateRange, setDateRange] = useState("all");
  const progressData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Progress (%)",
        data: [20, 40, 60, 80, 100],
        backgroundColor: "#4CAF50",
      },
    ],
  };

  // Data for "Technologies Most Used"
  const technologiesData = {
    labels: ["React", "TailwindCSS", "Node.js", "Others"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#61DAFB", "#38BDF8", "#8CC84B", "#A9A9A9"],
        hoverOffset: 8,
      },
    ],
  };

  // Data for "Time Spent on Different Projects"
  const timeSpentData = {
    labels: ["Portfolio", "E-Commerce App", "Dashboard Tool", "Blog App"],
    datasets: [
      {
        label: "Hours",
        data: [50, 120, 90, 40],
        backgroundColor: ["#FFC107", "#FF5722", "#2196F3", "#9C27B0"],
      },
    ],
  };

  // Function to export charts as images
  const exportChartToImage = (chart) => {
    const canvas = chart.chartInstance.canvas;
    canvas.toBlob((blob) => {
      saveAs(blob, "chart.png");
    });
  };

  // Filtering the data based on the selected date range
  const filteredProgressData = {
    ...progressData,
    datasets: [
      {
        ...progressData.datasets[0],
        data:
          dateRange === "all"
            ? progressData.datasets[0].data
            : progressData.datasets[0].data.slice(0, dateRange === "3months" ? 3 : 5),
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 pt-20 pb-20">
      <h2 className="text-3xl font-bold text-center mb-6">Analytics Overview</h2>
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDateRange("all")}
        >
          All Time
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDateRange("3months")}
        >
          Last 3 Months
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDateRange("5months")}
        >
          Last 5 Months
        </button>
      </div>
      <div className="chart-container">
        <h3 className="text-xl mb-4 text-center font-semibold">
          Project Progress Over Time
        </h3>
        <p className="text-gray-600 text-center mb-6">
          View the progress made across months, tracking completion percentages over time to understand your work's pace.
        </p>
        <Bar
          data={filteredProgressData}
          options={{
            responsive: true,
            animation: {
              duration: 1500,
            },
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.raw}% progress in ${context.label}`,
                },
              },
            },
          }}
          getDatasetAtEvent={(e) => exportChartToImage(e.chart)}
        />
      </div>
      <div className="chart-container">
        <h3 className="text-xl mb-4 text-center font-semibold">
          Technologies Most Used
        </h3>
        <p className="text-gray-600 text-center mb-6">
          This chart highlights the distribution of technologies you've used across projects, helping you track your tech stack proficiency.
        </p>
        <Pie
          data={technologiesData}
          options={{
            responsive: true,
            animation: {
              duration: 1000, // Animation duration
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.label}: ${context.raw}%`,
                },
              },
            },
          }}
          getDatasetAtEvent={(e) => exportChartToImage(e.chart)}
        />
      </div>
      <div className="chart-container">
        <h3 className="text-xl mb-4 text-center font-semibold">
          Time Spent on Different Projects
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Analyze how much time you've dedicated to each project, allowing you to identify focus areas and make time management decisions.
        </p>
        <Bar
          data={timeSpentData}
          options={{
            responsive: true,
            animation: {
              duration: 1000,
            },
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.raw} hours spent on ${context.label}`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Hours",
                },
              },
            },
          }}
          getDatasetAtEvent={(e) => exportChartToImage(e.chart)}
        />
      </div>
    </div>
  );
};

export default AnalyticsSection;
