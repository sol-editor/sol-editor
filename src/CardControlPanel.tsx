import { useState } from "react";

import Divider from "@mui/material/Divider";
import StyledToggleButtonGroup from "./StyledToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import StarEmptyIcon from "@mui/icons-material/Brightness5";
import StarHalfIcon from "@mui/icons-material/Brightness6";
import StarFullIcon from "@mui/icons-material/Brightness4";
import RotateIcon from "@mui/icons-material/ThreeSixty";
import AuthorIcon from "@mui/icons-material/Edit";

import "./CardControlPanel.css";
import {
  InstabilityEffect,
  InstabilityEffectColor,
  InstabilityEffectSetter,
  InstabilityEffectType,
} from "./InstabilityEffect";
import { ReactComponent as MoveIcon } from "./assets/front/icons/move.svg";
import { ReactComponent as ConvertIcon } from "./assets/front/icons/convert.svg";
import { ReactComponent as ActivateIcon } from "./assets/front/icons/activate.svg";
import { ReactComponent as DrawIcon } from "./assets/front/icons/draw.svg";
import { ReactComponent as AnyIcon } from "./assets/front/icons/any.svg";
import ButtonContainer from "./ButtonContainer";

export default function CardControlPanel(props: {
  instabilityEffect: InstabilityEffect;
  setInstabilityEffect: InstabilityEffectSetter;
  isFlipped: Boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [creditStore, cacheCredit] = useState("Author");

  function setColor(
    _: React.MouseEvent<HTMLElement>,
    color: InstabilityEffectColor | null,
  ) {
    if (color != null) {
      props.setInstabilityEffect({
        ...props.instabilityEffect,
        color,
      });
    }
  }

  function setType(
    _: React.MouseEvent<HTMLElement>,
    type: InstabilityEffectType | null,
  ) {
    if (type != null) {
      props.setInstabilityEffect({
        ...props.instabilityEffect,
        type,
      });
    }
  }

  function toggleFlipped() {
    props.setFlipped(!props.isFlipped);
  }

  function toggleCredit() {
    const { credit, ...properties } = props.instabilityEffect;
    if (credit == null) {
      props.setInstabilityEffect({
        ...properties,
        credit: creditStore,
      });
    } else {
      cacheCredit(credit);
      props.setInstabilityEffect(properties);
    }
  }

  return (
    <ButtonContainer>
      <StyledToggleButtonGroup
        value={props.instabilityEffect.color}
        exclusive
        onChange={setColor}
        aria-label="card color"
      >
        <ToggleButton value={InstabilityEffectColor.Blue} aria-label="blue">
          <StarEmptyIcon htmlColor="#0da5cf" />
        </ToggleButton>
        <ToggleButton value={InstabilityEffectColor.Green} aria-label="green">
          <StarEmptyIcon htmlColor="#41a847" />
        </ToggleButton>
        <ToggleButton value={InstabilityEffectColor.Yellow} aria-label="yellow">
          <StarHalfIcon htmlColor="#fcd939" />
        </ToggleButton>
        <ToggleButton value={InstabilityEffectColor.Red} aria-label="red">
          <StarFullIcon htmlColor="#ac2a2a" />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={props.isFlipped}
        exclusive
        aria-label="card side"
      >
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToggleButton
          value={true}
          onClick={toggleFlipped}
          aria-label="toggle rotation"
        >
          <RotateIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <StyledToggleButtonGroup
        value={props.instabilityEffect.credit != null}
        exclusive
        aria-label="card side"
      >
        <ToggleButton
          value={true}
          onClick={toggleCredit}
          aria-label="toggle credit"
        >
          <AuthorIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup
        value={props.instabilityEffect.type}
        exclusive
        onChange={setType}
        aria-label="effect type"
      >
        <ToggleButton value={InstabilityEffectType.Move} aria-label="move">
          <MoveIcon className="effect-type-icon" />
        </ToggleButton>
        <ToggleButton
          value={InstabilityEffectType.Convert}
          aria-label="convert"
        >
          <ConvertIcon className="effect-type-icon" />
        </ToggleButton>
        <ToggleButton
          value={InstabilityEffectType.Activate}
          aria-label="activate"
        >
          <ActivateIcon className="effect-type-icon" />
        </ToggleButton>
        <ToggleButton value={InstabilityEffectType.Draw} aria-label="draw">
          <DrawIcon className="effect-type-icon" />
        </ToggleButton>
        <ToggleButton value={InstabilityEffectType.Any} aria-label="any">
          <AnyIcon className="effect-type-icon" />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </ButtonContainer>
  );
}
