import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Flippable from "./Flippable";
import "./InstabilityEffect.css";

import backSideBackground from "./assets/back/background.png";
import frontSideBackground from "./assets/front/background.png";
import { ReactComponent as Logo } from "./assets/back/logo.svg";
import { ReactComponent as TokenBackground } from "./assets/front/token-background.svg";
import { ReactComponent as TokenPlaceholder } from "./assets/front/token-placeholder.svg";
import { ReactComponent as MoveIcon } from "./assets/front/icons/move.svg";
import { ReactComponent as ConvertIcon } from "./assets/front/icons/convert.svg";
import { ReactComponent as ActivateIcon } from "./assets/front/icons/activate.svg";
import { ReactComponent as DrawIcon } from "./assets/front/icons/draw.svg";
import { ReactComponent as AnyIcon } from "./assets/front/icons/any.svg";

export enum InstabilityEffectType {
  Move,
  Convert,
  Activate,
  Draw,
  Any,
}

export enum InstabilityEffectColor {
  Blue,
  Green,
  Yellow,
  Red,
}

export type InstabilityEffect = {
  title: string;
  effect: string;
  type: InstabilityEffectType;
  color: InstabilityEffectColor;
  credit?: string;
};

export type Setter<Type> = React.Dispatch<React.SetStateAction<Type>>;
export type InstabilityEffectSetter = Setter<InstabilityEffect>;

export function CardContainer(props: {
  isFlipped: boolean;
  children: [front: React.ReactNode, back: React.ReactNode];
}) {
  return (
    <div className="card-container half-size">
      <Flippable isFlipped={props.isFlipped}>
        <div id="card-front" className="card-display-viewport cropped">
          {props.children[0]}
        </div>
        <div id="card-back" className="card-display-viewport cropped">
          {props.children[1]}
        </div>
      </Flippable>
    </div>
  );
}

function getColorClass(color: InstabilityEffectColor): string {
  switch (color) {
    case InstabilityEffectColor.Blue:
      return "card-color-blue";
    case InstabilityEffectColor.Green:
      return "card-color-green";
    case InstabilityEffectColor.Yellow:
      return "card-color-yellow";
    case InstabilityEffectColor.Red:
      return "card-color-red";
  }
}

export function CardFront(props: {
  instabilityEffect: InstabilityEffect;
  setInstabilityEffect: InstabilityEffectSetter;
}) {
  const effect = props.instabilityEffect.effect;
  function setEffect(event: ChangeEvent<HTMLTextAreaElement>) {
    props.setInstabilityEffect({
      ...props.instabilityEffect,
      effect: event.target.value,
    });
  }

  function setCredit(event: ChangeEvent<HTMLInputElement>) {
    props.setInstabilityEffect({
      ...props.instabilityEffect,
      credit: event.target.value,
    });
  }

  return (
    <div className="card-front">
      <BackgroundImage source={frontSideBackground} />

      <CardTitle
        instabilityEffect={props.instabilityEffect}
        setInstabilityEffect={props.setInstabilityEffect}
      />
      <textarea className="card-effect" value={effect} onChange={setEffect} />
      <Credit credit={props.instabilityEffect.credit} setCredit={setCredit} />

      <CardEffectIcon effectType={props.instabilityEffect.type} />
      <TokenBackground className="token-background" />
      <TokenPlaceholder
        className={
          "token-placeholder " + getColorClass(props.instabilityEffect.color)
        }
      />
    </div>
  );
}

const minTitleWidth = 625;
const maxTitleFontSize = 78;

export function CardTitle(props: {
  instabilityEffect: InstabilityEffect;
  setInstabilityEffect: InstabilityEffectSetter;
}) {
  const [titleWidth, setTitleWidth] = useState(minTitleWidth);
  const [titleFontSize, setTitleFontSize] = useState(maxTitleFontSize);

  const title = props.instabilityEffect.title;
  function setTitle(event: ChangeEvent<HTMLInputElement>) {
    props.setInstabilityEffect({
      ...props.instabilityEffect,
      title: event.target.value,
    });
  }

  return (
    <>
      <input
        className={
          "card-title card-title-text " +
          getColorClass(props.instabilityEffect.color)
        }
        type="text"
        value={title}
        onChange={setTitle}
        maxLength={25}
        style={{
          fontSize: `${titleFontSize}px`,
        }}
      />
      <TextMeasurer
        className="card-title-text"
        text={title}
        setFontSize={setTitleFontSize}
        setWidth={setTitleWidth}
        minWidth={625}
        maxWidth={750}
        minFontSize={40}
        maxFontSize={78}
      />
      <div
        className="line"
        style={{
          width: `${titleWidth - 6}px`,
        }}
      />
    </>
  );
}

export function CardEffectIcon(props: { effectType: InstabilityEffectType }) {
  switch (props.effectType) {
    case InstabilityEffectType.Move:
      return <MoveIcon className="type-icon icon-move" />;
    case InstabilityEffectType.Convert:
      return <ConvertIcon className="type-icon icon-convert" />;
    case InstabilityEffectType.Activate:
      return <ActivateIcon className="type-icon icon-activate" />;
    case InstabilityEffectType.Draw:
      return <DrawIcon className="type-icon icon-draw" />;
    case InstabilityEffectType.Any:
      return <AnyIcon className="type-icon icon-any" />;
  }
}

export function Credit(props: {
  credit?: string;
  setCredit: React.ChangeEventHandler<HTMLInputElement>;
}) {
  if (props.credit == null) {
    return null;
  }
  return (
    <div className="credit-container">
      <span className="credit-label">Credit:</span>
      <input
        className="credit"
        type="text"
        value={props.credit}
        onChange={props.setCredit}
      />
    </div>
  );
}

export function BackgroundImage(props: { source: string }) {
  return <img className="background" src={props.source} alt="" />;
}

export function TextMeasurer(props: {
  className: string;
  text: string;
  setFontSize: Setter<number>;
  setWidth: Setter<number>;
  minWidth: number;
  maxWidth: number;
  minFontSize: number;
  maxFontSize: number;
}) {
  const container = useRef(null as HTMLDivElement | null);
  const {
    className,
    text,
    minFontSize,
    maxFontSize,
    minWidth,
    maxWidth,
    setWidth,
    setFontSize,
  } = props;

  function updateSize() {
    const div = container.current as HTMLDivElement;
    let fontSize = maxFontSize;
    let currentWidth = div.scrollWidth;
    do {
      div.style.fontSize = `${fontSize}px`;
      currentWidth = div.scrollWidth;
      if (currentWidth <= maxWidth) {
        setWidth(Math.max(minWidth, currentWidth));
        setFontSize(fontSize);
        break;
      } else if (--fontSize < minFontSize) {
        setWidth(maxWidth);
        setFontSize(minFontSize);
        break;
      }
    } while (currentWidth > maxWidth);
  }

  useEffect(updateSize, [
    className,
    text,
    minFontSize,
    maxFontSize,
    minWidth,
    maxWidth,
    setWidth,
    setFontSize,
  ]);
  return (
    <div className={"hidden " + className} ref={container}>
      {text}
    </div>
  );
}

export function CardBack() {
  return (
    <div className="card-back">
      <BackgroundImage source={backSideBackground} />
      <Logo className="logo" />
    </div>
  );
}

export default function InstabilityEffectCard(props: {
  instabilityEffect: InstabilityEffect;
  setInstabilityEffect: InstabilityEffectSetter;
  isFlipped: boolean;
}) {
  return (
    <CardContainer isFlipped={props.isFlipped}>
      <CardFront
        instabilityEffect={props.instabilityEffect}
        setInstabilityEffect={props.setInstabilityEffect}
      />
      <CardBack />
    </CardContainer>
  );
}
