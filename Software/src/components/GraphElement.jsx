import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphElement = ({ data }) => {

  const [chartData, setChartData] = useState({
    labels: Array(10).fill(0),
    datasets: [
      {
        label: 'Temperature',
        data: Array(10).fill(0),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        yAxisId: 'y',
      },
      {
        label: 'Humidity',
        data: Array(10).fill(0),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        yAxisId: 'y',
      },
      {
        label: 'Brightness',
        data: Array(10).fill(0),
        fill: false,
        borderColor: 'rgb(255, 206, 86)',
        tension: 0.1,
        yAxisID: 'y1',
      },
    ],
  });

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        position: 'left',
        max: 100,
      },
      y1: {
        type: 'linear',
        beginAtZero: true,
        position: 'right',
        max: 5000,
      }
    },
    maintainAspectRatio: false,
    aspectRatio: 1.5,
  };

  useEffect(() => {
    const updateChartData = () => {
      setChartData((prevChartData) => {
        const time = new Date(data.createdAt);
        const hour = time.getHours().toString().padStart(2, '0');
        const minute = time.getMinutes().toString().padStart(2, '0');
        const second = time.getSeconds().toString().padStart(2, '0');

        const newLabels = [...prevChartData.labels.slice(1), `${hour}:${minute}:${second}`];
        const newTemperatureData = [...prevChartData.datasets[0].data.slice(1), data.temperature];
        const newHumidityData = [...prevChartData.datasets[1].data.slice(1), data.humidity];
        const newBrightnessData = [...prevChartData.datasets[2].data.slice(1), data.brightness];

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: newTemperatureData,
            },
            {
              ...prevChartData.datasets[1],
              data: newHumidityData,
            },
            {
              ...prevChartData.datasets[2],
              data: newBrightnessData,
            },
          ],
        };
      });
    };
    updateChartData();
  }, [data]);

  return (
    <div className="graph--container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default GraphElement;


