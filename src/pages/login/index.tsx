import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";
import { Typography, Container } from "@mui/material";
import { CustomOutlinedButton, GradientButton } from "@/components/buttons";
import { CustomTextField } from "@/components/text-fields";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <Container className="p-4 max-w-sm mx-auto h-[100vh] flex flex-col justify-center">
      <Typography
        variant="h4"
        className="mb-4 font-poppins font-black tracking-tight text-white"
      >
        Iniciar sesión
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomTextField
          label="Email"
          type="email"
          value={email}
          className="font-poppins"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          InputLabelProps={{
            classes: {
              root: "font-poppins tracking-tight",
            },
          }}
          InputProps={{
            classes: { input: "font-poppins tracking-tight text-white" },
          }}
        />
        <CustomTextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          InputLabelProps={{
            classes: {
              root: "font-poppins tracking-tight text-white",
            },
          }}
          InputProps={{
            classes: { input: "font-poppins tracking-tight text-white" },
          }}
        />
        <GradientButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="font-poppins"
        >
          Iniciar sesión
        </GradientButton>
        {error && (
          <Typography className="font-poppins tracking-tight" color="error">
            {error}
          </Typography>
        )}
      </form>
      <CustomOutlinedButton
        onClick={() => router.push("/register")}
        variant="outlined"
        fullWidth
        className="mt-4 font-poppins"
      >
        ¿No tienes una cuenta? Regístrate
      </CustomOutlinedButton>
    </Container>
  );
};

export default LoginPage;
