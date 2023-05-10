import React, { useState ,useEffect} from "react"
import Chart from 'react-apexcharts'

const LineGraph = ({revenue}) => {
    const [data, setData] = useState({
        series: [
          {
            name: "Revenue",
            data: Array(12).fill(0),
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "Revenue per Month",
            align: "left",
          },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          },
        },
      });
      
      useEffect(() => {
        const newData = data.series[0].data.slice(); 
      
        revenue.forEach((item) => {
          if (item.month !== null && item.month >= 1 && item.month <= 12) {
            newData[item.month - 1] = item.revenue;
          }
        });
      
        setData((prevState) => ({
          ...prevState,
          series: [
            {
              ...prevState.series[0],
              data: newData,
            },
          ],
        }));
      }, [revenue]);
      
    return (
        <Chart
            options={data.options} series={data.series} type="line" width={380}
        />
    )
}

export default LineGraph;