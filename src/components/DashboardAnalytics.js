import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DashboardAnalytics = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure chart responsiveness
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Progress (%)',
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#333',
        formatter: (value) => `${value}%`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Progress',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full">
      <p className="text-center text-gray-600 mb-4 text-sm md:text-base">
        Track your monthly progress with this interactive chart.
      </p>
      <div className="relative h-64 md:h-80 w-full max-w-[100%]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
