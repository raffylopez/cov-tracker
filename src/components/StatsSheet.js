/*
 * StatsSheet.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import commafy from "commafy";
import getMonthsList from "../data/getMonthsList.js";
import Loader from "./Loader";
import cx from "classnames";
import "./StatsSheet.css";

export default class StatsSheet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { inProgress } = this.props;

    const { TotalConfirmed, TotalRecovered } = this.props.countryData || "n/a";

    const totalConfirmed = TotalConfirmed || "-";
    const totalRecovered = TotalRecovered || "-";

    const date = new Date();
    return (
      <div>
        <div className="stats-sheet">
          <Loader inProgress={inProgress} />
          <h4 className="stats_sheet_subtitle">
            Latest as of{" "}
            {`${
              getMonthsList()[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()}`}
          </h4>
          <h1 className="stat-title">{this.props.selectedCountry.name}</h1>
          <p>
            <label>Total Confirmed Cases:</label>{" "}
            <span>{commafy(totalConfirmed)}</span>
          </p>
          <p>
            <label>Total Recovered: </label>{" "}
            <span>{commafy(totalRecovered)}</span>
          </p>
          <p>
            <label>Total Mortality: </label> <span>{}</span>
          </p>
        </div>
      </div>
    );
  }
}
