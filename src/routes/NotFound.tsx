import { Container, Box, Typography, Button } from "@mui/material";

import { strings } from "../constants";

export default function NotFound() {
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = "/frontend/";
            }}
          >
            {strings.notFound.goHome}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
