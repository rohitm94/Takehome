import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import Rewards from "./rewards";

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">Check Rewards</Link>
        </header>
        <Router>
          <Rewards path="/" />
        </Router>
      </div>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
