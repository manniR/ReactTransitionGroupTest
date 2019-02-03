import * as React from "react";
import { render } from "react-dom";
import EventApp from "./components/EventApp";

import "./styles.scss";

function App() {
  return <EventApp />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
