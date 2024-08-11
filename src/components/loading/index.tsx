import { Container } from "@mui/material";
import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <Container className="p-4 max-w-sm mx-auto h-[100vh] flex flex-col justify-center">
      <BounceLoader className="mx-auto" size={180} />
    </Container>
  );
};

export default Loading;
