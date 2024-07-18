import InstabilityEffectCard, {
  InstabilityEffect,
  InstabilityEffectType,
  InstabilityEffectColor,
} from "./InstabilityEffect";
import "./App.css";
import { useState } from "react";
import CardControlPanel from "./CardControlPanel";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CardExportPanel from "./CardExportPanel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [instabilityEffect, setInstabilityEffect] = useState({
    title: "Name",
    effect: "Click here to edit!",
    type: InstabilityEffectType.Move,
    color: InstabilityEffectColor.Blue,
  } as InstabilityEffect);
  const [isFlipped, setFlipped] = useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="editor-container">
        <CardControlPanel
          instabilityEffect={instabilityEffect}
          setInstabilityEffect={setInstabilityEffect}
          isFlipped={isFlipped}
          setFlipped={setFlipped}
        />
        <InstabilityEffectCard
          instabilityEffect={instabilityEffect}
          setInstabilityEffect={setInstabilityEffect}
          isFlipped={isFlipped}
        />
        <CardExportPanel name={instabilityEffect.title} isFlipped={isFlipped} />
      </div>
    </ThemeProvider>
  );
}
