/*
 * ChartDisplay.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import commafy from "commafy";
import getMonthsList from "../data/getMonthsList.js";

import "./ChartDisplay.css";

export default class ChartDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  tooltipLabelFormatter = (label) => {
    const date = new Date(label);
    return `${
      getMonthsList()[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}
    `;
  };

  tooltipValueFormatter = (value) => {
    return commafy(value);
  };

  formatXAxis = (value) => {
    const dateVal = new Date(value);
    return getMonthsList()[dateVal.getMonth()] + " " + dateVal.getDate();
  };

  yAxisTickFormatter = (value) => {
    return commafy(value);
  };

  render() {
    const { width, height, data } = this.props;
    return (
      <div className="cov-chart-container">
        <LineChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickFormatter={this.formatXAxis}
            minTickGap={10}
          />
          <YAxis tickFormatter={this.yAxisTickFormatter} />
          <Tooltip
            labelFormatter={this.tooltipLabelFormatter}
            formatter={this.tooltipValueFormatter}
          />
          <Legend />
          <Line
            dot={false}
            type="monotone"
            dataKey="Confirmed"
            stroke="#8884d8"
          />
          <Line
            dot={false}
            type="monotone"
            dataKey="Recovered"
            stroke="#82ca9d"
          />
        </LineChart>
      </div>
    );
  }
}
