import React from "react";
import { Paper } from "@mui/material";

export default function ButtonContainer(props: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "inline-flex",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
      }}
    >
      {props.children}
    </Paper>
  );
}
