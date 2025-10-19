import { Google as GoogleIcon } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router";

import { useLogin } from "./useLogin";
import logo from "../../assets/logo.png";
import { Toast } from "../../components/Toast";
import { strings } from "../../constants";
import type { LocationState } from "../../hooks/useRoutes";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggingIn, handleGoogleLogin } = useLogin();

  async function onGoogleLogin() {
    try {
      await handleGoogleLogin();
      
      const state = location.state as LocationState;
      const from = state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: (theme) => 
          `linear-gradient(to bottom right, ${theme.palette.secondary.main}4D, ${theme.palette.primary.main}4D)`,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt={strings.login.logoAlt}
        sx={{
          width: { xs: "200px", sm: "300px", md: "380px" },
          height: "auto",
          marginBottom: 4,
        }}
      />
      
      <Button
        type="button"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<GoogleIcon />}
        onClick={onGoogleLogin}
        disabled={isLoggingIn}
        aria-label={isLoggingIn ? strings.login.loggingIn : strings.login.loginWithGoogle}
        aria-busy={isLoggingIn}
        title={strings.login.loginWithGoogle}
        sx={{
          paddingX: 4,
          paddingY: 1.5,
          fontSize: "1rem",
          textTransform: "none",
          minWidth: { xs: 240, sm: 340, md: 460 },
        }}
      >
        {isLoggingIn ? strings.login.loggingIn : strings.login.loginWithGoogle}
      </Button>

      <Toast />
    </Box>
  );
}
