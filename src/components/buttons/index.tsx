import { Button, styled } from "@mui/material";

export const GradientButton = styled(Button)(() => ({
  background: "linear-gradient(45deg, #ff5722 30%, #ff9800 90%)",
  color: "#fff",
  border: "none",
  boxShadow: "0 3px 5px 2px rgba(255, 87, 34, 0.3)",
  "&:hover": {
    background: "linear-gradient(45deg, #ff5722 50%, #ff9800 70%)",
    boxShadow: "0 5px 7px 4px rgba(255, 87, 34, 0.5)",
  },
}));

export const CustomOutlinedButton = styled(Button)(() => ({
  borderColor: "#ff5722", 
  color: "#ff5722",
  "&:hover": {
    borderColor: "#ff9800", 
    color: "#ff9800",
  },
}));
