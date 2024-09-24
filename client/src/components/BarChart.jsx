// BarChart.js
import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const BarChart = () => {
  const data = {
    labels: ['Network', 'Web', 'Service'],
    datasets: [
      {
        label: 'Total Requests',
        data: [30, 50, 20], // Sample data; replace with your actual values
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Network color
          'rgba(54, 162, 235, 0.6)', // Web color
          'rgba(255, 206, 86, 0.6)',  // Service color
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
