/*
 * SimpleTimer.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';

export default class SimpleTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  tick = () => {
    this.setState({
      time: new Date()
    });
  }

  componentDidMount() {
    // start the timer
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    const {
      time
    } = this.state;
    return (
      <div>
      {String(time)}
      </div>
    )
  }
}
