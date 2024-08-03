import React from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import ButtonContainer from "./ButtonContainer";

export default function ResponsiveButtonPanel(props: {
  children: React.ReactElement[];
}) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  if (isLargeScreen) {
    return <ButtonContainer>{props.children}</ButtonContainer>;
  }
  const [top, ...bottom] = props.children;
  return (
    <>
      <ButtonContainer>{top}</ButtonContainer>
      <ButtonContainer>{bottom}</ButtonContainer>
    </>
  );
}
