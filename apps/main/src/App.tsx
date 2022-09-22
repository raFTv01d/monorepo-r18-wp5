import React from "react";

import { Index } from "@apps/ui";

import logo from "./assets/img/logo.svg";
import "./App.css";

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
                    <Index />
                </a>
            </header>
        </div>
    );
}

export default App;
