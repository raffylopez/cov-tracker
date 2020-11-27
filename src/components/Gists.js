/*
 * Gists.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import './Gists.css'
class Gists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: 0,
    };
  }

  componentDidMount() {
    fetch("http://api.github.com/gists")
      .then((response) => response.json())
      .then((gists) => gists.map((element) => element.description))
      .then((descriptions) =>
        this.setState({
          descriptions,
        })
      );
  }

  render() {
    return (
      <div className="gists">
        <ul>
          {this.state.descriptions
            ? this.state.descriptions
                .filter((item) => item != null && item != "")
                .map((item) => <li key={item}>{item}</li>)
            : "Loading..."}
        </ul>
      </div>
    );
  }
}

export default Gists;
