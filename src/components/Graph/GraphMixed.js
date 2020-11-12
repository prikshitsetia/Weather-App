import React, { Component } from "react";
import Chart from "chart.js";
import "./Graph.css";
export default class GraphMixed extends Component {
  componentDidMount() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.props.xData,
        datasets: [
          {
            label: "Temp",
            data: this.props.yData,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          },
          {
            label: "Max Temp",
            data: this.props.maxTemp,
            backgroundColor: ["rgba(153, 102, 255, 0.2)"],
          },
          {
            label: "Min Temp",
            data: this.props.minTemp,
            backgroundColor: ["rgba(255,99,132,0.2)"],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: this.props.title,
        },
      },
    });
  }
  render() {
    return (
      <div className="chartMixed">
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}
