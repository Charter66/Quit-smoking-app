import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../Styles/Goals.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DoughnutChart({ chartData, importanteNumber }) {
  const [options, setOptions] = useState({
    animationEnabled: true,
    subtitles: [
      {
        text: `${Math.ceil(importanteNumber)}%`,
        verticalAlign: "center",
        fontSize: 30,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "not finished", y: 100 - importanteNumber, color: "#FFF" },
          { name: "finished", y: importanteNumber, color: "#1f93a0" },
        ],
      },
    ],
    backgroundColor: "transparent",
    
  });

  return (
    <div>{chartData ? <CanvasJSChart options={options} /> : "Loading"}</div>
  );
}

export default DoughnutChart;
