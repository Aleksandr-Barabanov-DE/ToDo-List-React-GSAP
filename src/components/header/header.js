import { Component } from "react";
import "../header/header.css";
import image from "../images/todo-logo.png";
import gsap from "gsap";

export class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    gsap.to(".header-image", {
      duration: 1.5,
      opacity: 1,
      y: -10,
      ease: "power2.out",
    });
    gsap.fromTo(
      ".header-title",
      {
        opacity: 0,
        x: -10,
      },
      { opacity: 1, x: 0, duration: 1 }
    );
  }

  render() {
    return (
      <div className="header">
        <h1 className="header-title">ToDo List</h1>
        <img className="header-image" src={image} alt="todo list" />
      </div>
    );
  }
}
