import React, { ChangeEvent } from "react";
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

export type InstabilityEffectSetter = React.Dispatch<
  React.SetStateAction<InstabilityEffect>
>;

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

export function CardFront(props: {
  instabilityEffect: InstabilityEffect;
  setInstabilityEffect: InstabilityEffectSetter;
}) {
  const title = props.instabilityEffect.title;
  function setTitle(event: ChangeEvent<HTMLInputElement>) {
    props.setInstabilityEffect({
      ...props.instabilityEffect,
      title: event.target.value,
    });
  }

  const effect = props.instabilityEffect.effect;
  function setEffect(event: ChangeEvent<HTMLTextAreaElement>) {
    props.setInstabilityEffect({
      ...props.instabilityEffect,
      effect: event.target.value,
    });
  }

  function getColorClass(): string {
    switch (props.instabilityEffect.color) {
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

  function setCredit(event: ChangeEvent<HTMLInputElement>) {
    props.setInstabilityEffect({
      ...props.instabilityEffect,
      credit: event.target.value,
    });
  }

  return (
    <div className="card-front">
      <BackgroundImage source={frontSideBackground} />

      <input
        className={"card-title " + getColorClass()}
        type="text"
        value={title}
        onChange={setTitle}
      />
      <div className="line" />
      <textarea className="card-effect" value={effect} onChange={setEffect} />
      <Credit credit={props.instabilityEffect.credit} setCredit={setCredit} />

      <CardEffectIcon effectType={props.instabilityEffect.type} />
      <TokenBackground className="token-background" />
      <TokenPlaceholder className={"token-placeholder " + getColorClass()} />
    </div>
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
