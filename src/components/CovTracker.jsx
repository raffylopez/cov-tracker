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
import "./CovTracker.css";
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

export default class CovTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth - 150,
      height: 400,
      data: [],
      selectedCountry: { name: "Philippines", iso2: "PH" },
      stats: {},
      countryData: { TotalConfirmed: 0 },
      countries: [
        {
          Country: "Gathering data...",
          ISO2: "",
        },
      ],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.formatXAxis = this.formatXAxis.bind(this);
  }

  onChangeHandler() {
    const elemSelectCountry = document.getElementById("select-country");
    const selectedCountry = {
      name: elemSelectCountry.options[elemSelectCountry.selectedIndex].text,
      iso2: elemSelectCountry.value,
    };
    console.log(selectedCountry);
    this.setState({ selectedCountry: selectedCountry });

    const cb = (data) => {
      const countryData = data.Countries.find(
        (element) => element.CountryCode == selectedCountry.iso2
      );
      this.setState({
        countryData: countryData,
      });
    };
    fetchJsonFromUrl("https://api.covid19api.com/summary", cb);
    const countrySlug = this.state.countries.find(
      (country) => country.ISO2 == selectedCountry.iso2
    ).Slug;

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
      this.setState({ data: newData });
    };

    fetchJsonFromUrl(
      `https://api.covid19api.com/total/dayone/country/${countrySlug}`,
      dataComposerCallback
    );
  }

  updateDimensions() {
    // this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.setState({ width: window.innerWidth - 150 });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    // fetchJsonFromUrl("https://api.covid19api.com/summary", (dataAsJson) => {
    //    const filteredCountries = dataAsJson.Countries.filter(element=>{
    //       return element.TotalConfirmed != 0 && element.TotalRecovered !=0
    //    });
    //   this.setState({
    //      countries: filteredCountries,
    //   });
    // }).then(this.onChangeHandler);
    fetchJsonFromUrl("https://api.covid19api.com/countries", (countries) => {
      this.setState({
        countries,
      });
    }).then(this.onChangeHandler);
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
    const { data } = this.state;
    return (
      <div>
        <h1>Realtime Cov Epidemiological Curve (Day One to Current)</h1>
        <CountryList
          onChangeHandler={this.onChangeHandler}
          selectedCountry={this.state.selectedCountry}
          countries={this.state.countries}
        />
        <StatsSheet
          countryData={this.state.countryData}
          selectedCountry={this.state.selectedCountry}
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
    );
  }
}
