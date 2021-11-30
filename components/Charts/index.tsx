import { ArcElement, Chart } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import React from "react";

Chart.register(ArcElement);

const CustomDoughnutChart = (chartData: any) => {

  const options = {
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  };

  const generateArrData = () => {
    let arrData: any = [];

    chartData?.data.map((item: any) => arrData.push(item?.value));

    return arrData;
  };

  const data = {
    labels: ["a", "b", "c"],
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
  return <Doughnut data={data} options={options} />;
};

export default CustomDoughnutChart;
