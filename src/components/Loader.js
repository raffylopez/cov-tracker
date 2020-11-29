/*
 * Status.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React from "react";
import cx from "classnames";
import "./Loader.css";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { inProgress } = this.props;
    const { statusMessage } = this.props;
    return (
      <div
        className={cx({ am_visible: inProgress, am_invisible: !inProgress })}
      >
        <div className="status_loader">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" />
          </svg>
        </div>
      </div>
    );
  }
}
