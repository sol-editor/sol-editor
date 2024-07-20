import "./Footer.css";
import { Link, Paper } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <div className="footer-content">
        <Link
          href="https://elephantlaboratories.com/sol"
          underline="none"
          color="warning"
        >
          Sol: Last Days of a Star
        </Link>{" "}
        was created by{" "}
        <Link
          href="https://elephantlaboratories.com/"
          underline="none"
          color="warning"
        >
          Elephant Laboratories
        </Link>
      </div>
    </Paper>
  );
}
