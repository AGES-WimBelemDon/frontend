import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";

import { strings } from "../../constants";
import { theme } from "../../styles/theme";

type NewActivityModalProps = {
    isOpen: boolean;
    setModalOpen: (open: boolean) => void;
};

const BACKGROUND_STYLE = {
  position: "fixed" as const,
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  backdropFilter: "blur(6px)",
  display: "flex" as const,
  justifyContent: "center" as const,
  alignItems: "center" as const,
  zIndex: "1000",
};

const MODAL_STYLE = {
  backgroundColor: theme.palette.background.default,
  width: 621,
  height: 191,
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,.25)",
  display: "flex" as const,
  flexDirection: "column" as const,
  justifyContent: "center" as const,
  alignItems: "center" as const,
  gap: 16,
};

export function NewActivityModal({ isOpen, setModalOpen }: NewActivityModalProps) {
  if (!isOpen) return null;

  return (
    <div style={BACKGROUND_STYLE}>
      <div style={MODAL_STYLE}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: 561,
            height: 42
          }}
        >
          <div></div>
          <Typography variant="h6" fontWeight={"Bold"}>
            {strings.newActivityModal.title}
          </Typography>

          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ color: theme.palette.primary.main }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: 561,
            height: 57
          }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "regular",
              fontSize: 12,
            }}>
            {strings.newActivityModal.textFieldTitle}
          </Typography>
          <TextField
            placeholder= {strings.newActivityModal.textFieldPlaceholder}
            InputProps={{
              sx: {
                width: 561,
                height: 37
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: 561,
            height: 52
          }}>
          <Button
            variant="contained"
            sx={{
              width: 100,
              height: 37,
              backgroundColor: theme.palette.primary.main,
              fontWeight: "bold",
              fontSize: 14,
              textTransform: "none"
            }}>
            {strings.newActivityModal.buttonText}
          </Button>
        </Box>
      </div>
    </div>
  );
}