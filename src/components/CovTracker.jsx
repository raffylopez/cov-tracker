/*
 * CovTracker.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import fetchJsonFromUrl from "../util/fetchJsonFromUrl.js";
import CountryList from "./CountryList";
import StatsSheet from "./StatsSheet";
import StatusDisplay from "./StatusDisplay";
import cx from "classnames";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import getMonthsList from "../data/getMonthsList.js";

import "./CovTracker.css";

export default class CovTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: "Fetching...",
      width: window.innerWidth - 150,
      height: 400,
      data: [],
      stats: {},
      selectedCountry: {},
      countryData: { TotalConfirmed: 0 },
      inProgress: true,
      isInitialAvailable: false,
      countries: [
        {
          Country: "",
          Slug: "",
          CountryCode: "",
        },
      ],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.formatXAxis = this.formatXAxis.bind(this);
    this.findPerCountryStats = this.findPerCountryStats.bind(this);
  }

  findPerCountryStats(selectedCountry) {
    // const { selectedCountry } = this.state;
    const dataComposerCallback = (jsonData) => {
      if (jsonData.length === 0) {
        const newData = [0, 0].map((e) => {
          return { name: 0, Confirmed: 0, Recovered: 0 };
        });
        this.setState({ data: newData });
        return;
      }
      const newData = jsonData.map((e, idx) => {
        return {
          name: e.Date,
          Confirmed: e.Confirmed,
          Recovered: e.Recovered,
        };
      });
      this.setState({ data: newData, inProgress: false });
    };

    // console.log("FUNC", selectedCountry);
    fetchJsonFromUrl(
      `https://api.covid19api.com/total/dayone/country/${selectedCountry.slug}`,
      dataComposerCallback
    );
  }

  onChangeHandler() {
    const elemSelectCountry = document.getElementById("select-country");

    const selectedCountry = {
      name: elemSelectCountry.options[elemSelectCountry.selectedIndex].text,
      slug: elemSelectCountry.value, // dropdown element value is country slug
    };
    // console.log("ONC", selectedCountry);

    const countryData = this.state.countries.find(
      (element) => element.Slug == selectedCountry.slug
    );
    this.setState({
      countryData: countryData,
      selectedCountry: selectedCountry,
      inProgress: true,
    });
    this.findPerCountryStats(selectedCountry);
  }

  updateDimensions() {
    // this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.setState({ width: window.innerWidth - 150 });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    fetchJsonFromUrl("https://api.covid19api.com/summary", (dataAsJson) => {
      const filteredCountries = dataAsJson.Countries.filter((element) => {
        return element.TotalConfirmed != 0 && element.TotalRecovered != 0;
      });
      this.setState({
        countries: filteredCountries,
        selectedCountry: { name: "Philippines", slug: "philippines" },
        isInitialAvailable: true,
      });
    })
      .then(() => this.onChangeHandler())
      .catch((error) => {
        this.setState({
          statusMessage: "Unable to reach endpoint at this time",
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  formatXAxis(value) {
    const dateVal = new Date(value);
    return getMonthsList()[dateVal.getMonth()] + " " + dateVal.getDate();
  }

  tooltipLabelFormatter(label) {
    const date = new Date(label);
    return `${
      getMonthsList()[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}
    `;
  }

  render() {
    const {
      data,
      inProgress,
      countries,
      selectedCountry,
      countryData,
      isInitialAvailable,
      statusMessage,
    } = this.state;
    return (
      <div>
        <StatusDisplay inProgress={inProgress} statusMessage={statusMessage} />
        <div
          className={cx({
            covvisible: isInitialAvailable,
            covhidden: !isInitialAvailable,
          })}
        >
          <h1>Realtime Cov Epidemiological Curve (Day One to Current)</h1>
          <CountryList
            onChangeHandler={this.onChangeHandler}
            selectedCountry={selectedCountry}
            countries={countries}
          />
          <StatsSheet
            countryData={countryData}
            selectedCountry={selectedCountry}
            inProgress={inProgress}
          />
          <div className="cov-chart-container">
            <LineChart
              width={this.state.width}
              height={this.state.height}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickFormatter={this.formatXAxis}
                minTickGap={20}
              />
              <YAxis />
              <Tooltip labelFormatter={this.tooltipLabelFormatter} />
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
        </div>
      </div>
    );
  }
}
