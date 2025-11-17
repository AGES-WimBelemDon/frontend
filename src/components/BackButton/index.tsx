import { ArrowBackIosNew } from "@mui/icons-material";
import { Fab } from "@mui/material";

import { useRoutes } from "../../hooks/useRoutes";

export function BackButton() {
  const { goBack } = useRoutes();

  return (
    <Fab
      onClick={goBack}
      aria-label="Go back"
      title="Go back"
      size="medium"
      sx={{
        width: 56,
        height: 56,
        borderRadius: "9999px",
        backgroundColor: "background.paper",
        color: "primary.main",
        border: "none",
        boxShadow: "0 6px 18px background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 1000,
        "&:hover": { backgroundColor: "background.default" },
      }}
    >
      <ArrowBackIosNew aria-hidden="true" focusable="false" />
    </Fab>
  );
}
