/*
 * MyList.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React from "react";
import MyListForm from "./MyListForm";
import MyListItems from "./MyListItems";
import isNotEmpty from "../logic/isNotEmpty";
import "./MyList.css";

export default class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: "Initial",
          id: -2,
        },
      ],
      loadStatus: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.counter = -1;
  }

  handleClear(value) {
    this.setState({
      items: [],
    });
  }

  handleClick(value) {
    const { items } = this.state;
    const inputBox = document.getElementById("mylist-input");
    if (inputBox.value.trim() !== "") {
      this.setState({
        items: [
          ...items,
          {
            name: value,
            id: ++this.counter,
          },
        ],
      });
      inputBox.value = "";
    }
  }

  handleLoad() {
    this.setState({
      loadStatus: true,
    });
    const { items } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Foobar" }),
    };
    fetch("http://api.github.com/gists")
      .then((response) => response.json())
      .then((gists) =>
        gists.filter((element) => isNotEmpty(element.description))
      )
      .then((elements) => {
        this.setState({
          items: [
            ...items,
            ...elements.map((element) => {
              return {
                name: element.description,
                url: element.html_url,
                id: ++this.counter,
              };
            }),
          ],
        });
        /* force a timeout to prevent jerky transitions */
        setTimeout(() => {
          this.setState({ loadStatus: false });
        }, 500);
      });
  }

  handleDelete(deleteKey) {
    const { items } = this.state;
    const newItems = items.filter((element) => element.id != deleteKey);
    this.setState({
      items: newItems,
    });
  }

  render() {
    return (
      <h1>Latest Github Gists</h1>
      <div>
        <MyListForm
          clickHandler={this.handleClick}
          loadHandler={this.handleLoad}
          clearHandler={this.handleClear}
          loadStatus={this.state.loadStatus}
        />
        <MyListItems
          items={this.state.items}
          deleteAction={this.handleDelete}
        />
      </div>
    );
  }
}
