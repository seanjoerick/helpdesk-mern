// src/components/HorizontalBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = () => {
  const data = {
    labels: ['IT', 'Sales', 'Marketing', 'Immigration'],
    datasets: [
      {
        label: 'Total Requests',
        data: [120, 80, 60, 90], // Sample data; replace with your actual data
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Makes the bar chart horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
