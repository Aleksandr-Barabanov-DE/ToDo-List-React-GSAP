import { Component } from "react";
import "../variables.css";
import "../container/container.css";
import { List } from "../list/list";
import { Header } from "../header/header";
import gsap from "gsap";

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
