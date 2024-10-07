import React from "react";
import "../variables.css";
import "../container/container.css";
import { List } from "../list/List";
import { Header } from "../header/Header";

export const Container = () => {
  return (
    <div className="app-container">
      <Header />
      <List />
    </div>
  );
};
