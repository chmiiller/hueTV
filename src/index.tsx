import React from "react";
import ReactDOM from "react-dom/client";

import FocusableApp from './App';
import "./index.css";
import { init } from '@noriginmedia/norigin-spatial-navigation';

init();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FocusableApp />
  </React.StrictMode>
);
