import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import "../Styles/Goals.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DoughnutChart({ chartData }) {
  const options = {
    animationEnabled: true,
    subtitles: [{
      text: `${chartData.positivePercentage}%`,
      verticalAlign: "center",
      fontSize: 30,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###'%'",
      dataPoints: chartData.dataPoints,
    }],
	backgroundColor: 'transparent',
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default DoughnutChart;
