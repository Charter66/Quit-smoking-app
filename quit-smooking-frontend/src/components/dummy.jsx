//-----------------------------------------------------------------
  // this is a dummy calculation useState. This should be replaced!
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    setProgress(true);
  }, []);

  // Chart
  const chartData = {
    dataPoints: [
      { name: "not finished", y: 100 },
      { name: "finished", y: 200 },
    ],
  };

  const totalDataPoints = chartData.dataPoints.reduce(
    (total, dataPoint) => total + dataPoint.y,
    0
  );
  const collectedDataPoints = chartData.dataPoints.find(
    (dataPoint) => dataPoint.name === "finished"
  ).y;

  const positivePercentage = (
    (collectedDataPoints / totalDataPoints) *
    100
  ).toFixed(1);

  chartData.positivePercentage = positivePercentage;

  // Modify the color of the doughnut chart sections
  chartData.dataPoints = chartData.dataPoints.map((dataPoint) => {
    if (dataPoint.name === "finished") {
      return {
        ...dataPoint,
        color: "#66bec7", // Change the color to the desired color for the 'finished' section
      };
    } else {
      return {
        ...dataPoint,
        color: "#FFF", // Change the color to the desired color for other sections
      };
    }
  });
  //-----------------------------------------------------------------