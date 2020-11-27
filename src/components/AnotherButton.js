/*
 * AnotherButton.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React, {useEffect, useState} from 'react';
// import styled, { css } from 'astroturf';
//
// const styles = css`
// .button {
//     background-color:red;
//     color: white;
// }`;

// const styles = styled("button")`
// color: white;
// `

const AnotherButton = ({label})=>{
  return (
    <button>{label}</button>
  )
};

export const sum = (one, two) => one + two;
export default AnotherButton;
