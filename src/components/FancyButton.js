/*
 * FancyButton.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import './FancyButton.css'
const FancyButton = ({className, label})=>{
  return (
    // <button className={style.btn}>{label}</button>
    <button className="fancy-button">{label}</button>
  )
};

export const sum = (one, two) => one + two;
export default FancyButton;
