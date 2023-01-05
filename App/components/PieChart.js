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
        theme.extend.colors.steel_teal,
        theme.extend.colors.light_morning_blue,
      ],
      borderColor: theme.extend.colors.steel_teal
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
                  family: 'SVN_Poppins',
                  size: 12,
                  weight: 'normal',
                },
                color: theme.extend.colors.steel_teal
              }
            },
            title: {
              display: true,
              text: 'My Fokus Chart',
              font: {
                family: 'SVN_Poppins',
                size: 14,
                weight: 'bold',
              },
              color: theme.extend.colors.steel_teal
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