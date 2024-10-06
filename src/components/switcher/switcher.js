import { Component } from "react";
import "../variables.css";

export class Switch extends Component {
  render() {
    const { id, isChecked, onToggle } = this.props;

    return (
      <div className="switch">
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={onToggle}
        />
        <label htmlFor={id} className="task-label"></label>
      </div>
    );
  }
}
