/*
 * App.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import FancyButton from "./FancyButton";
import AnotherButton from "./AnotherButton";
import Gists from "./Gists";

const App = (props) => {
  return (
    <div className="foo">
      <p>Hello React!</p>
      <p>
        <FancyButton label="Click Me" className="fancy-button" />
      </p>
      <p>
        <FancyButton label="Click Here" className="outlined" />
      </p>
    <Gists/>
    </div>
  );
};

export default App;
