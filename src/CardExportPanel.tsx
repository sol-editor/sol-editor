import { ToggleButton } from "@mui/material";
import ButtonContainer from "./ButtonContainer";
import StyledToggleButtonGroup from "./StyledToggleButtonGroup";
import ExportIcon from "@mui/icons-material/Download";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { useState } from "react";

const cardWidth = 1158;
const cardHeight = 868;

export default function CardExportPanel(props: {
  isFlipped: boolean;
  name: string;
}) {
  const [isLoading, setLoading] = useState(false);
  function exportPng() {
    setLoading(true);
    const id = props.isFlipped ? "card-back" : "card-front";
    toPng(document.getElementById(id) as HTMLElement, {
      width: cardWidth,
      height: cardHeight,
      style: {
        overflow: "visible",
      },
    }).then(
      function (dataUrl: string) {
        const suffix = props.isFlipped ? " reverse" : "";
        download(dataUrl, `${props.name}${suffix}.png`);
        setLoading(false);
      },
      function () {
        setLoading(false);
      },
    );
  }

  return (
    <ButtonContainer>
      <StyledToggleButtonGroup>
        <ToggleButton
          size="large"
          value=""
          onClick={exportPng}
          disabled={isLoading}
        >
          <ExportIcon fontSize="large" />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </ButtonContainer>
  );
}
