import React from 'react';
import 'chart.js/auto';
import { Chart, Pie } from 'react-chartjs-2';
import { theme } from '../tailwind.config';

function PieChart(props) {
  const totalTimePercent = props.totalTimePercent;

  const data = {
    labels: [
      'Today Time Fokused (%)',
      'Other (%)'
    ],
    datasets: [{
      data: [totalTimePercent, 100 - totalTimePercent],
      backgroundColor: [
        theme.extend.colors.purple,
        theme.extend.colors.purple_light,
      ],
      borderColor: theme.extend.colors.purple
    }]
  };

  return (
    <div className='w-[500px] h-[500px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px]'>
      <Pie 
        data={data}
        options={{
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  family: 'Poppins',
                  size: 12,
                  weight: 'normal',
                },
                color: theme.extend.colors.purple
              }
            },
            title: {
              display: true,
              text: 'My Fokus Chart',
              font: {
                family: 'Poppins',
                size: 14,
                weight: 'bold',
              },
              color: theme.extend.colors.purple
            }
          },
          responsive: true
        }}
        >
      </Pie>
    </div>
  )
}

export default PieChart