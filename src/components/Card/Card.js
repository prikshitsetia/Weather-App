import React, { Component } from "react";
import "./Card.css";
export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: false,
    };
  }

  render() {
    return (
      <div>
        <button
          className="border"
          onClick={() => this.setState({ details: !this.state.details })}
        >
          <div className="card border">
            <img className="card-img" src={this.props.image} alt="Card"></img>
            <div className="card-body">
              <h5 className="card-title">
                {this.state.details ? this.props.condition : this.props.day}
              </h5>
              <p className="card-text">
                {this.state.details
                  ? `Max Temp : ${this.props.maxtemp}C`
                  : this.props.date}
              </p>
              <p className="card-text">
                {this.state.details
                  ? `Min Temp : ${this.props.mintemp}C`
                  : `Temp : ${this.props.temp}C`}
              </p>
            </div>
          </div>
        </button>
      </div>
    );
  }
}
