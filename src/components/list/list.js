import React, { useState, useEffect, useRef } from "react";
import "../switcher/switcher.css";
import "./list.css";
import { Switch } from "../switcher/Switcher";
import gsap from "gsap";

export const List = () => {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const listContainerRef = useRef(null);
  const deleteAllRef = useRef(null);

  useEffect(() => {
    const savedList = localStorage.getItem("todoList");
    if (savedList) {
      setList(JSON.parse(savedList));
    }

    gsap.set(listContainerRef.current, { x: -30, opacity: 0 });
    gsap.to(listContainerRef.current, {
      duration: 1.5,
      opacity: 1,
      x: 0,
      ease: "power2.out",
    });
  }, []);

  const addItem = () => {
    if (userInput.trim() === "") {
      alert("Please enter an item");
      return;
    }

    const newItem = { text: userInput.trim(), isChecked: false };
    const updatedList = [...list, newItem];

    setList(updatedList);
    setUserInput(""); // Очистка поля ввода
    localStorage.setItem("todoList", JSON.stringify(updatedList));

    const newItemIndex = updatedList.length - 1;
    const newItemElement = listContainerRef.current.children[newItemIndex];

    // Устанавливаем начальное состояние для анимации
    gsap.fromTo(
      newItemElement,
      { opacity: 0, x: -30 },
      { duration: 0.5, opacity: 1, x: 0, ease: "power2.out" }
    );
  };

  const deleteItems = () => {
    setList([]);
    localStorage.removeItem("todoList");
  };

  const deleteItem = (index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const toggleItem = (index) => {
    const updatedList = list.map((item, i) =>
      i === index ? { ...item, isChecked: !item.isChecked } : item
    );
    setList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  return (
    <div className="list-container" ref={listContainerRef}>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
      >
        <div className="input-wrapper">
          <input
            className="container-input"
            type="text"
            placeholder="What do we need to do?"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
        </div>
        <button type="submit" className="button add-button">
          Add Task
        </button>
      </form>
      <ul>
        {list.map((item, index) => (
          <li
            key={index}
            className={`list-item ${item.isChecked ? "checked" : ""}`}
          >
            <div className="item-container">
              <div className="item-container-wrapper">
                <p className="item-text">{item.text}</p>
                <Switch
                  id={`switch-${index}`}
                  isChecked={item.isChecked}
                  onToggle={() => toggleItem(index)}
                />
              </div>
              <button
                className="button delete-one-button"
                onClick={() => deleteItem(index)}
              >
                Delete Task
              </button>
            </div>
          </li>
        ))}
      </ul>
      {list.length > 0 && (
        <button
          className="button delete-button"
          ref={deleteAllRef}
          onClick={deleteItems}
        >
          Delete All
        </button>
      )}
    </div>
  );
};
