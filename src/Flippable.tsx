import React from "react";
import "./Flippable.css";

/**
 * A helper component that simulates a two-sided card that can be flipped with a 3D-like animation.
 * @param props must contain two children and a flipped boolean flag.
 * @returns new React component.
 */
export default function Flippable(props: {
  children: [front: React.ReactNode, back: React.ReactNode];
  isFlipped: boolean;
}): React.ReactElement {
  let { children, isFlipped } = props;
  return (
    <div className={`flippable ${isFlipped ? "flipped" : ""}`}>
      <div className={`front ${isFlipped ? "bottom" : ""}`}>{children[0]}</div>
      <div className={`back ${isFlipped ? "" : "bottom"}`}>{children[1]}</div>
    </div>
  );
}
