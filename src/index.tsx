import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import Sepa from "./Toto";
import Custo from "./Morpion/MonMorpion";
import MorpionV2 from "./MorpionV2/MV2";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <MorpionV2/>
    <Sepa />
    <App />
    <Sepa />
    <Custo />
  </StrictMode>
);