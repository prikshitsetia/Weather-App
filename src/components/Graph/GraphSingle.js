import React, { Component } from "react";
import Chart from "chart.js";
import "./Graph.css";
export default class GraphSingle extends Component {
  componentDidMount() {
    var ctx = document.getElementById("Chart" + this.props.no);
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.props.xData,
        datasets: [
          {
            label: "",
            data: this.props.yData,
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
      <div className="chart">
        <canvas id={"Chart" + this.props.no}></canvas>
      </div>
    );
  }
}
