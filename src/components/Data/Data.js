import React, { Component } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./Data.css";
import GraphMixed from "../Graph/GraphMixed";
import GraphSingle from "../Graph/GraphSingle";
export default class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      daysName: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      city: "London",
      forecast: 5,
      days: [],
      temp: [],
      minTemp: [],
      maxTemp: [],
      singleGraphTime: [],
      singleGraphTemp: [],
      key1: 0,
      key2: 50,
    };
  }
  componentDidMount() {
    console.log(1);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.successFunction,
        errorFunction
      );
    }

    function errorFunction() {
      alert("Geocoder failed");
    }
  }
  successFunction = async (position) => {
    console.log(2);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    const res = await axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.API}&lat=${lat}&lon=${lng}&format=json`
    );
    this.setState({
      city: res.data.address.city,
    });
    this.getData();
  };

  getData = async (e) => {
    console.log(3);
    if (e !== undefined) {
      e.preventDefault();
    }
    let res;

    res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${
        this.state.city.charAt(0).toUpperCase() + this.state.city.slice(1)
      }&appid=${process.env.API_KEY}&units=metric`
    );
    this.processData(res);
  };
  processData = async (res) => {
    let newArray = res.data.list.filter((d, i) => {
      return i % 8 === 0;
    });
    let temporaryData = [];
    let x = 0;
    let graphHourlyData = [];
    for (let i = 0; i <= res.data.list.length; i++) {
      if (x < this.state.forecast) {
        if (i % 8 !== 0) {
          temporaryData.push(res.data.list[i]);
        } else {
          if (i === 0) {
            temporaryData = [res.data.list[i]];
          } else {
            let a = temporaryData;
            temporaryData = [res.data.list[i]];
            x += 1;
            graphHourlyData.push(a);
          }
        }
      }
    }
    let hourlyTime = graphHourlyData.map((d) => {
      let time = d.map((o) => o.dt_txt);
      return time;
    });
    let hourlyTemp = graphHourlyData.map((d) => {
      let temp = d.map((o) => o.main.temp);
      return temp;
    });

    let dateObj = new Date();
    let weekday = dateObj.getDay();

    for (let i = 0; i < 5; i++) {
      newArray[i].day = weekday;

      weekday += 1;
      if (weekday > 6) {
        weekday = 0;
      }
    }
    newArray = newArray.filter((d, i) => {
      return i < this.state.forecast;
    });
    let daysData = newArray.map((d) => this.state.daysName[d.day]);
    let tempData = newArray.map((d) => d.main.temp);
    let minTempData = newArray.map((d) => d.main.temp_min);

    let maxTempData = newArray.map((d) => d.main.temp_max);
    this.setState({
      data: newArray,
      days: daysData,
      temp: tempData,
      minTemp: minTempData,
      maxTemp: maxTempData,
      key1: this.state.key1 + 1,
      key2: this.state.key2 + 1,
      singleGraphTime: hourlyTime,
      singleGraphTemp: hourlyTemp,
    });
  };

  setCity = (e) => {
    this.setState({
      city: e,
    });
  };

  setForecast = (e) => {
    console.log(e);
    this.setState({
      forecast: e,
    });
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="title">Weather App</h1>
            </div>
            <div className="col-md-6">
              <form className="region" onSubmit={(e) => this.getData(e)}>
                <input
                  type="text"
                  className="regioninput"
                  placeholder="Enter City..."
                  value={this.state.city}
                  onChange={(e) => this.setCity(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="regioninput ml-2 col-md-4"
                  placeholder="Forecast Days"
                  value={this.state.forecast}
                  onChange={(e) => this.setForecast(e.target.value)}
                />
                <button type="submit" className="ml-2 btn">
                  Get Data
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row user-weather">
          {this.state.data.map((d, index) => {
            return (
              <div className="col sm mt-5" key={index}>
                <Card
                  day={this.state.daysName[d.day]}
                  date={d.dt_txt}
                  temp={d.main.temp}
                  image={
                    "http://openweathermap.org/img/wn/" +
                    d.weather[0].icon +
                    "@2x.png"
                  }
                  condition={d.weather[0].description}
                  maxtemp={d.main.temp_max}
                  mintemp={d.main.temp_min}
                />
              </div>
            );
          })}
        </div>{" "}
        <GraphMixed
          label="Temp"
          xData={this.state.days}
          yData={this.state.temp}
          key={this.state.key1}
          minTemp={this.state.minTemp}
          maxTemp={this.state.maxTemp}
          title={"Temperatur Variations in " + this.state.city + " for 5 days"}
        />
        <div className="row">
          {this.state.data.map((d, i) => {
            return (
              <div className="col graph">
                <GraphSingle
                  no={i}
                  label={"Temp on " + this.state.daysName[d.day]}
                  xData={this.state.singleGraphTime[i]}
                  yData={this.state.singleGraphTemp[i]}
                  key={this.state.key2 + i}
                  title={
                    "Temperatur Variations in " +
                    this.state.city +
                    " on " +
                    this.state.daysName[d.day]
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
