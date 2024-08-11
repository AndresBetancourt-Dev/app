import { styled, TextField } from "@mui/material";

export const CustomTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#bdbdbd",
    },
    "&:hover fieldset": {
      borderColor: "#ff5722",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff5722",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#bdbdbd",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#ff5722",
  },
}));
