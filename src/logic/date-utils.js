/*
 * dateUtils.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

const formatIsoDate = (isoDate) => {
  const dateVal = new Date(isoDate);
  return `${dateVal.getMonth()}/${dateVal.getDate()}/${dateVal.getFullYear()} GMT ${getTimezoneOffset()}`;
}

const timezoneGeo = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getTimezoneOffset = ()=> {
  function z(n){return (n<10? '0' : '') + n}
  var offset = new Date().getTimezoneOffset();
  var sign = offset < 0? '+' : '-';
  offset = Math.abs(offset);
  return sign + z(offset/60 | 0) + z(offset%60);
}


export {
  formatIsoDate,timezoneGeo
};
