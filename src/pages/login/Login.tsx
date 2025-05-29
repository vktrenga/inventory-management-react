import { Box, TextField, Button, Typography, Grid, Alert } from "@mui/material";
import { useLogin } from "../../hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { LoginForm } from "../../types/user";

const schema = yup.object().shape({
  username: yup.string().required("User Name is required"),
  password: yup.string().required("Password is required"),
});

// Define the LoginForm type


const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const { mutate: login } = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setErrorMessage(null); // Clear any previous error messages
    login(data, {
      onSuccess: (response: { data: { access_token: string; }; }) => {
        console.log("Login successful", response);
        localStorage.setItem("access_token", response?.data?.access_token); // Assuming the response contains a token
        window.location.href = "/products";
      },
      onError: (error: any) => {
        console.error("Login failed", error);
        setErrorMessage("Invalid username or password. Please try again."); // Set error message
      },
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="User Name"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;