/*
 * MyListTextField.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { CSSTransition } from "react-transition-group";
import "./MyListForm.css";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loadStatus } = this.props;
    return (
      <div>
        <input className="mylist-textfield" id="mylist-input" type="text" />
        <button
          className="btn"
          onClick={() =>
            this.props.clickHandler(
              document.getElementById("mylist-input").value
            )
          }
        >
          Add
        </button>
        <button className="btn" onClick={() => this.props.loadHandler()}>
          Load Gists
        </button>
        <button className="btn" onClick={() => this.props.clearHandler()}>
          Clear
        </button>

        <CSSTransition
          in={loadStatus}
          timeout={350}
          classNames="display"
          unmountOnExit
        >
          <span className="btn btn-yellow">Loading...</span>
        </CSSTransition>
      </div>
    );
  }
}
