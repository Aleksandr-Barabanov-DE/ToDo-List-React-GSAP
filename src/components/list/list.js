import "../switcher/switcher.css";
import "./list.css";
import { Switch } from "../switcher/Switcher";
import { Component } from "react";
import gsap from "gsap";

export class List extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      list: [],
    };
  }

  componentDidMount() {
    // Загрузка списка из localStorage
    const savedList = localStorage.getItem("todoList");
    if (savedList) {
      this.setState({ list: JSON.parse(savedList) });
    }

    gsap.set(".list-container", { x: -30, opacity: 0 });

    gsap.to(".list-container", {
      duration: 1.5,
      opacity: 1,
      x: 0,
      ease: "power2.out",
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  onChangeEvent(event) {
    this.setState({ userInput: event });
  }

  addItem(userInput) {
    if (userInput.length === 0 || userInput === "") {
      alert("Please enter an item");
      return false;
    }
    let listArr = [...this.state.list];
    let listArrLength = listArr.length;
    listArr.push({ text: userInput, isChecked: false });

    // Обновляем состояние и сохраняем в localStorage
    this.setState({ list: listArr, userInput: "" }, () => {
      localStorage.setItem("todoList", JSON.stringify(listArr));

      const newItemIndex = listArr.length - 1; // Индекс только что добавленного элемента
      const newItem = document.querySelector(
        `.list-item:nth-child(${newItemIndex + 1})`
      );

      // Устанавливаем начальное состояние для анимации
      gsap.fromTo(
        newItem,
        { opacity: 0, x: -30 }, // Начальное состояние
        { duration: 0.5, opacity: 1, x: 0, ease: "power2.out" } // Конечное состояние
      );
    });

    if (listArrLength > 0) {
      const deleteAll = document.querySelector(".delete-button");
      deleteAll.style.display = "flex";
    }
  }

  deleteItems() {
    let listArr = [];
    this.setState({ list: listArr }, () => {
      localStorage.setItem("todoList", JSON.stringify(listArr)); // Очищаем localStorage
    });
    const deleteAll = document.querySelector(".delete-button");
    deleteAll.style.display = "none";
  }

  deleteItem(index) {
    const updatedList = [...this.state.list];
    updatedList.splice(index, 1);
    this.setState({ list: updatedList }, () => {
      localStorage.setItem("todoList", JSON.stringify(updatedList)); // Сохраняем обновленный список
    });
  }

  toggleItem(index) {
    const updatedList = [...this.state.list];
    updatedList[index].isChecked = !updatedList[index].isChecked;
    this.setState({ list: updatedList }, () => {
      localStorage.setItem("todoList", JSON.stringify(updatedList)); // Сохраняем обновленный список
    });
  }

  render() {
    return (
      <div className="list-container">
        <form action="" className="form" onSubmit={this.onFormSubmit}>
          <div className="input-wrapper">
            <input
              className="container-input"
              type="text"
              placeholder="What do we need to do?"
              onChange={(event) => {
                this.onChangeEvent(event.target.value);
              }}
              value={this.state.userInput}
            />
          </div>
          <button
            className="button add-button"
            onClick={() => this.addItem(this.state.userInput)}
          >
            Add Task
          </button>
        </form>
        <ul>
          {this.state.list.map((item, index) => (
            <li
              key={index}
              className={`list-item ${item.isChecked ? "checked" : ""}`}
              onClick={() => this.toggleItem(index)}
            >
              <div className="item-container">
                <div className="item-container-wrapper">
                  <p className="item-text">{item.text}</p>
                  <Switch
                    id={`switch-${index}`}
                    isChecked={item.isChecked}
                    onToggle={() => this.toggleItem(index)}
                  />
                </div>
                <button
                  className="button delete-one-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.deleteItem(index);
                  }}
                >
                  Delete Task
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="button delete-button"
          onClick={() => this.deleteItems()}
        >
          Delete All
        </button>
      </div>
    );
  }
}
