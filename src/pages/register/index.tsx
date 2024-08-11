import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";
import { Typography, Container } from "@mui/material";
import { CustomTextField } from "@/components/text-fields";
import { CustomOutlinedButton, GradientButton } from "@/components/buttons";

const RegisterPage = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      router.push("/login");
    } catch (error) {
      setError("Error al registrarse");
    }
  };

  return (
    <Container className="p-4 max-w-sm mx-auto h-[100vh] flex flex-col justify-center">
      <Typography
        variant="h4"
        className="mb-4 font-poppins font-black tracking-tight text-white"
      >
        Registrarse
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <CustomTextField
            label="Email"
            type="email"
            value={email}
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
        </div>
        <div>
          <CustomTextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        </div>
        <GradientButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="font-poppins"
        >
          Registrarse
        </GradientButton>
        {error && (
          <Typography className="font-poppins tracking-tight" color="error">
            {error}
          </Typography>
        )}
      </form>
      <CustomOutlinedButton
        onClick={() => router.push("/login")}
        variant="outlined"
        fullWidth
        className="mt-4 font-poppins"
      >
        Iniciar sesión
      </CustomOutlinedButton>
    </Container>
  );
};

export default RegisterPage;
