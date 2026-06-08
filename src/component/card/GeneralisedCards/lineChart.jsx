// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts";
// import { Box } from "@mui/material";

// const LineChart = ({ chartData, minValue, maxValue, criticalValue, xAxis,yAxis }) => {
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);

//     console.log(minValue,maxValue,criticalValue,'chd');
    
    
//   const getColorSettings = (value) => {
//     if (!minValue || !maxValue || !criticalValue) {
//         return '#757676'
//       }

//       if (value > minValue && value < maxValue) {
//         return '#76C739'; // Green
//       } else if (value >= maxValue && value < criticalValue) {
//         return '#e7af84'; // Orange
//       } else if (value >= criticalValue || value <= minValue) {
//         return '#F26457'; // Red
//       }
//   };  

//   useEffect(() => {
//     if (!chartInstance.current) {
//       chartInstance.current = echarts.init(chartRef.current);
//     }

//     const option = {
//     //   title: {
//     //     text: "Dynamic Gradient Line Chart",
//     //     left: "center",
//     //   },
//       tooltip: {
//         trigger: "axis",
//       },
//       xAxis: {
//         type: "category",
//         data: chartData?.labels || [],
//       },
//       yAxis: {
//         type: "value",
//         name : `${xAxis}`,
//         // nameLocation: "top",
//         // nameGap: 45
//       },
//       series: [
//         {
//           name: "Value",
//           type: "line",
//           smooth: true,
//           data: chartData?.data || [],
//           lineStyle: {
//             width: 0,
//             color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
//               { offset: 0, color: getColorSettings(chartData?.data[0]) },
//               { offset: 0.5, color: getColorSettings(chartData?.data[Math.floor(chartData?.data.length / 2)]) },
//               { offset: 1, color: getColorSettings(chartData?.data[chartData?.data.length - 1]) },
//             ]),
//           },
//           areaStyle: {
//             display : 'none',
//             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//               { offset: 0, color: getColorSettings(chartData?.data[0]) },
//               { offset: 1,  color: getColorSettings(chartData?.data[chartData?.data.length - 1]) },
//             ]),
//           },
//           symbol: "none",
//           symbolSize: 8,
//           itemStyle: {
//             color: (params) => getColorSettings(params.value),
//           },
//         },
//       ],
//     };

//     chartInstance.current.setOption(option);

//     const handleResize = () => chartInstance.current.resize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [chartData, minValue, maxValue, criticalValue]);

//   return <Box ref={chartRef} style={{ width: 650, height: '250px',position : 'relative', bottom : 0, }} />;
// };

// export default LineChart;

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";

const LineChart = ({ chartData, minValue, maxValue, criticalValue, xAxis }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getColorSettings = (value) => {
    if (value === undefined || value === null) return "#757676"; 

    if (value > minValue && value < maxValue) {
      return "#76C739"; 
    } else if (value >= maxValue && value < criticalValue) {
      return "#e7af84"; 
    } else {
      return "#F26457";
    }
  };

  useEffect(() => {
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    if (!chartData?.data || chartData.data.length === 0) return; 

    const option = {
      tooltip: {
        trigger: "axis",
        formatter: function (params) {
          let tooltipText = `${params[0].axisValue} <br/>`; 
          params.forEach((item) => {
            tooltipText += `${xAxis} : ${item.value} <br/>`; 
          });
          return tooltipText;
        }
      },      
      xAxis: {
        type: "category",
        data: chartData?.labels || [],
      },
      yAxis: {
        type: "value",
        name: xAxis,
      },
      series: [
        {
          name: "Value",
          type: "line",
          smooth: true,
          data: chartData?.data || [],
          lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: getColorSettings(chartData?.data[0]) },
              {
                offset: 0.5,
                color: getColorSettings(
                  chartData?.data[Math.floor(chartData?.data.length / 2)]
                ),
              },
              { offset: 1, color: getColorSettings(chartData?.data.at(-1)) },
            ]),
          },
          areaStyle: {
            opacity: 0.6,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: getColorSettings(chartData?.data[0]) },
              { offset: 1, color: getColorSettings(chartData?.data.at(-1)) },
            ]),
          },
          symbol: "circle",
          symbolSize: 6,
          itemStyle: {
            color: (params) => getColorSettings(params.value),
          },
        },
      ],
    };

    chartInstance.current.setOption(option);
    const handleResize = () => chartInstance.current.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chartData, minValue, maxValue, criticalValue]);

  return (
    <Box ref={chartRef} style={{ width: 700, height: "250px" }} />
  );
};

export default LineChart;
