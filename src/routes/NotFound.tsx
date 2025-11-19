import { Container, Box, Typography, Button } from "@mui/material";

import { strings } from "../constants";
import { useRoutes } from "../hooks/useRoutes";

export default function NotFound() {
  const { goTo } = useRoutes();
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          bgcolor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          {strings.notFound.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {strings.notFound.message}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={() => goTo("/")}>{strings.notFound.goHome}</Button>
        </Box>
      </Box>
    </Container>
  );
}
