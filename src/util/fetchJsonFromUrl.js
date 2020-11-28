/*
 * fetchJsonFromUrl.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

const countryCache = [];
var hit = false;

const fetchJsonFromUrl = (url, callback, cached = false)=> {
  // if (hit) {
  //   console.log("cached");
  //   callback(countryCache);
  //   return;
  // }

  return fetch(url).then(response=>response.json()).then(
    result=>{
      hit = true;
      countryCache.concat(result);
      if(result.Message) {
        console.log("MESSAGE", result.Message)
        throw new Error("Endpoint unreachable")
      } else {
        callback(result);
      }
    }
  ).catch(error=>{ console.log("Uh oh", error)})
}

export default fetchJsonFromUrl;
