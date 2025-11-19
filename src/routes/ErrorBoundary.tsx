import React from "react";

import { Box, Button, Container, Typography } from "@mui/material";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { strings } from "../constants";

function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary?: () => void }) {
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
          {strings.errorBoundary.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {strings.errorBoundary.message}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = "/frontend/";
            }}
          >
            {strings.errorBoundary.goHome}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (resetErrorBoundary) resetErrorBoundary();
              window.location.reload();
            }}
          >
            {strings.errorBoundary.reload}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { /* noop */ }}>
      {children}
    </ReactErrorBoundary>
  );
}
