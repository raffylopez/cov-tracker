/*
 * Status.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React from "react";
import cx from 'classnames';
import './StatusDisplay.css'


export default class StatusDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      inProgress
    } = this.props;
    return (
      <div className="contain">
      <div className={cx({display: inProgress, hide: !inProgress })}>
      <span>Fetching...</span>
      </div>
      </div>
    );
  }
}
