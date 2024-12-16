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
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Monthly Progress (%)',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 5,
        padding: 10,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}%`; 
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        font: {
          weight: 'bold',
          size: 14,
        },
        color: '#333',
        formatter: (value) => `${value}%`, 
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
          color: '#333',
        },
      },
      y: {
        beginAtZero: true,
        max: 100, 
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          font: {
            size: 12,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
          color: '#333',
          callback: function (value) {
            return `${value}%`; 
          },
        },
      },
    },
  };

  // Your chart data (data in percentage values)
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Progress',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-center text-gray-600 mb-6">
        Track your monthly progress and performance data in percentage with this interactive chart.
      </p>
      <div className="chart-container">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
