import React from "react";

import { Button as UiButton } from "@apps/ui";

import logo from "./assets/img/logo.svg";
import "./App.css";
import { BestButton } from "./components/BestButton";
import { SimpleJs } from "./components/SimpleJs";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} height={100} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <UiButton>Ui button</UiButton>
        </div>
        <div>
          <BestButton />
        </div>
        <SimpleJs />
      </header>
    </div>
  );
}

export default App;
