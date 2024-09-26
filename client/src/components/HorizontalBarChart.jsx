// src/components/HorizontalBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = () => {
  const data = {
    labels: ['Tickets'],
    datasets: [
      {
        label: 'Total Requests',
        data: [120],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)'
        ],
      },
    ],
  };

  const options = {
    indexAxis: 'y', 
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
