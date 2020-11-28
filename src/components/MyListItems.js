/*
 * MyListItems.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import './MyListItems.css'

export default class MyListItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items || [];
    const liItems = items.map((element, idx) => (
      <li className="mylist-li" key={element.id}>
        {
          <button className='btn mylist-del' onClick={() => this.props.deleteAction(element.id)}>
            DEL
          </button>
        }
        <a href={element.url} target="_blank">{element.name.trim()}</a>
        <span className='element-id'>{element.id}</span>
      </li>
    ));
    return <ul className="mylist-ul">{liItems}</ul>;
  }
}
