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
import ChartDisplay from "./ChartDisplay";
import cx from "classnames";
import getMonthsList from "../data/getMonthsList.js";
import { formatIsoDate } from "../logic/date-utils.js";

import "./CovTracker.css";

export default class CovTracker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: "Loading...",
      width: window.innerWidth - 150,
      height: 400,
      data: [],
      stats: {},
      selectedCountry: {},
      countryData: { TotalConfirmed: 0 },
      inProgress: true,
      isInitialAvailable: false,
      latestDate: "",
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
    this.findPerCountryStats = this.findPerCountryStats.bind(this);
  }

  findPerCountryStats(selectedCountry) {
    const dataComposerCallback = (jsonData) => {
      if (jsonData.length === 0) {
        const newData = [0, 0].map((e) => {
          return { name: 0, Confirmed: 0, Recovered: 0 };
        });
        this.setState({ data: newData });
        return;
      }
      const newData = jsonData.map((e, idx) => {
        console.log(e);
        return {
          name: e.Date,
          Confirmed: e.Confirmed,
          Recovered: e.Recovered,
          Mortality: e.Deaths
        };
      });

      setTimeout(() => {
        this.setState({
          latestDate: formatIsoDate(newData[newData.length - 1].name),
          selectedCountry: selectedCountry,
          data: newData,
          inProgress: false,
        });
      }, 500);
    };

    fetchJsonFromUrl(
      `https://api.covid19api.com/total/dayone/country/${selectedCountry.slug}`,
      dataComposerCallback
    ).catch((error) => {
      this.setState({
        statusMessage:
          "Unable to reach endpoint at this time. Please try again in a while.",
      });
    });
  }

  onChangeHandler() {
    const elemSelectCountry = document.getElementById("select-country");

    const selectedCountry = {
      name: elemSelectCountry.options[elemSelectCountry.selectedIndex].text,
      slug: elemSelectCountry.value, // dropdown element value is country slug
    };

    const countryData = this.state.countries.find(
      (element) => element.Slug == selectedCountry.slug
    );
    console.log("ABC", countryData)
    setTimeout(() => {
      this.setState({
        countryData: countryData,
        inProgress: true,
      });
    }, 0);
    this.findPerCountryStats(selectedCountry);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth - 150 });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    fetchJsonFromUrl("https://api.covid19api.com/summary", (dataAsJson) => {
      const filteredCountries = dataAsJson.Countries.filter((element) => {
        return element.TotalConfirmed != 0 && element.TotalRecovered != 0;
      });
      console.log(filteredCountries);
      this.setState({
        countries: filteredCountries,
        selectedCountry: { name: "Philippines", slug: "philippines" },
        isInitialAvailable: true,
      });
    })
      .then(() => this.onChangeHandler())
      .catch((error) => {
        this.setState({
          statusMessage:
            "Unable to reach endpoint at this time. Please try again in a while.",
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
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
      width,
      height,
      latestDate,
    } = this.state;
    return (
      <div>
        <StatusDisplay
          inProgress={!isInitialAvailable}
          statusMessage={statusMessage}
        />
        <div
          className={cx({
            covvisible: isInitialAvailable,
            covhidden: !isInitialAvailable,
          })}
        >
          <h1 className={"pageTitle"}>
            <span className='fragment0'>COVID19 Infection Rate</span>&nbsp;<span className='fragment1'>Worldwide</span>
          </h1>
          <CountryList
            onChangeHandler={this.onChangeHandler}
            selectedCountry={selectedCountry}
            countries={countries}
          />
          <StatsSheet
            countryData={countryData}
            selectedCountry={selectedCountry}
            inProgress={inProgress}
            latestDate={latestDate}
          />
          <ChartDisplay data={data} width={width} height={height} />
        </div>
      </div>
    );
  }
}
