/*
 * isNotEmpty.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
export default function(text) {
  return text != null && text !== undefined && text != false && text.trim(0) != ""
}
