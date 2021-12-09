import { ArcElement, Chart as ChartJS, LineElement, SubTitle, Tooltip } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import React from "react";

ChartJS.register(ArcElement, Tooltip, SubTitle, LineElement);

const CustomDoughnutChart = (chartData: any) => {

  const generateArrData = () => {
    let arrData: any = [];

    chartData?.data.map((item: any) => {
      arrData.push(item?.value)
    });

    return arrData;
  };

  const generateArrLabel = () => {
    let arrLabel: any = [];

    chartData?.data.map((item: any) => {
      arrLabel.push(item?.name)
    });

    return arrLabel;
  }

  const data = {
    labels: generateArrLabel(),
    datasets: [
      {
        data: generateArrData(),
        backgroundColor: ["#a95963", "#8796c0", "#7ed3ed"],
        hoverBackgroundColor: ["#a95963", "#8796c0", "#7ed3ed"],
        labels: {
          render: "label",
        },
      },
    ],
  };

  
  return <Doughnut data={data} />;
};

export default CustomDoughnutChart;
