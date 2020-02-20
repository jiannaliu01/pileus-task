import LoadingView from "./LoadingView";
import React, { Component } from "react";
import CanvasJSReact from "../canvasjs-2.3.2/canvasjs.react";
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true
    };
  }

  async componentDidMount() {
    const data = await axios.get("http://localhost:8081/statistics");
    console.log(data, "USerS");
    this.setState({
      data,
      isLoading: false
    });
  }

  getData() {
    console.log("out of data");
    setTimeout(() => {
      const data = axios.get("http://localhost:8081/statistics").data;
      console.log("inside of data");
      this.setState({
        data,
        loading: false
      });
    }, 1000);
  }

  addSymbols(e) {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }
  render() {
    console.log("IN RENDER", this.state.isLoading);
    if (!this.state.isLoading) {
      console.log(typeof this.state.data.data[0].data);
      const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Users WorldWide on Cloud Providers"
        },
        axisX: {
          title: "Cloud Providers",
          reversed: true
        },
        axisY: {
          title: "Worldwide Active Users",
          labelFormatter: this.addSymbols
        },
        data: [
          {
            type: "bar",
            dataPoints: [
              { y: parseInt(this.state.data.data[0].data), label: "AWS" },
              { y: parseInt(this.state.data.data[1].data), label: "GCP" },
              { y: parseInt(this.state.data.data[2].data), label: "Azure" }
            ]
          }
        ]
      };
      return (
        <div>
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
      );
    } else {
      return <LoadingView />;
    }
  }
}

export default BarChart;
