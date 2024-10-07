import { Component } from "react";
import "../variables.css";
import "../container/container.css";
import { List } from "../list/List";
import { Header } from "../header/Header";

export class Container extends Component {
  constructor() {
    super();
    this.setState = {};
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <List />
      </div>
    );
  }
}
