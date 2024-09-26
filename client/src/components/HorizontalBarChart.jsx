import React from 'react';
import { Bar } from 'react-chartjs-2';
import useTotalCommentsThisMonth from '../hooks/useTotalMonthComments'; 

const HorizontalBarChart = () => {
  const { totalComments, error, loading } = useTotalCommentsThisMonth(); 

  // Prepare chart data
  const data = {
    labels: ['Current Month'],
    datasets: [
      {
        label: 'Total Requests',
        data: [totalComments], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
