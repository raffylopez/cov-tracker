/*
 * CountryList.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import fetchJsonFromUrl from "../util/fetchJsonFromUrl";
import "./CountryList.css";

export default class CountryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { countries } = this.props;
    const countriesOptions = countries
      .sort((a, b) =>
        a.Country < b.Country ? -1 : a.Country > b.Country ? 1 : 0
      )
      .map((obj) => (
        <option key={obj.CountryCode} value={obj.Slug}>
          {obj.Country}
        </option>
      ));
    return (
      <select
        id="select-country"
        className="countriesList select-css"
        onChange={this.props.onChangeHandler}
        value={this.props.selectedCountry.slug}
      >
        {countriesOptions}
      </select>
    );
  }
}
