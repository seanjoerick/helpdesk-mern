import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import useTotalForm from '../hooks/useTotalForm';

Chart.register(...registerables);

const BarChart = () => {
  const { totalForm, error, loading } = useTotalForm();

  const labels = Array.isArray(totalForm) ? totalForm.map(item => item._id) : [];
  const dataValues = Array.isArray(totalForm) ? totalForm.map(item => item.total) : [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Requests',
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
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

  return (
    <div>
      {loading && <p>Loading...</p>} 
      {error && <p>{error}</p>} 
      {!loading && !error && <Bar data={data} options={options} />} 
    </div>
  );
};

export default BarChart;
